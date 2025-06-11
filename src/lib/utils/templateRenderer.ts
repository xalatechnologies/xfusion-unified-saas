type TemplateVariables = Record<string, unknown>;

export class TemplateRenderer {
  private static replaceVariables(template: string, variables: TemplateVariables): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const trimmedKey = key.trim();
      
      // Handle conditional blocks
      if (trimmedKey.startsWith('#')) {
        return ''; // Skip conditional blocks here, they are handled in render()
      }
      
      const value = this.getNestedValue(variables, trimmedKey);
      return value !== undefined ? String(value) : '';
    });
  }

  private static getNestedValue(obj: TemplateVariables, path: string): unknown {
    return path.split('.').reduce((acc, part) => {
      if (acc === undefined || acc === null) return undefined;
      return (acc as TemplateVariables)[part];
    }, obj);
  }

  public static render(template: string, variables: TemplateVariables): string {
    let result = template;
    
    // Handle conditional blocks first
    const conditionalPattern = /\{\{#([^}]+)\}\}(.*?)\{\{\/\1\}\}/gs;
    let hasConditionals;
    do {
      hasConditionals = false;
      result = result.replace(conditionalPattern, (match, key, content) => {
        hasConditionals = true;
        const value = this.getNestedValue(variables, key.trim());
        
        if (Array.isArray(value)) {
          return value.join(', ');
        }
        
        return value ? this.replaceVariables(content, variables) : '';
      });
    } while (hasConditionals);

    // Replace remaining variables
    result = this.replaceVariables(result, variables);

    return result.trim();
  }

  public static validateTemplate(template: string): boolean {
    // Check for matching conditional blocks
    const openTags = template.match(/\{\{#[^}]+\}\}/g) || [];
    const closeTags = template.match(/\{\{\/[^}]+\}\}/g) || [];

    if (openTags.length !== closeTags.length) {
      return false;
    }

    // Check for valid variable syntax
    const variablePattern = /\{\{([^}]+)\}\}/g;
    const variables = template.match(variablePattern) || [];
    
    return variables.every(variable => {
      const key = variable.slice(2, -2).trim();
      // Allow # for conditional blocks
      if (key.startsWith('#') || key.startsWith('/')) {
        return true;
      }
      return key.length > 0 && !key.includes('{') && !key.includes('}');
    });
  }
} 