import type { SearchResult } from "./search";

export function transformSearchResults(rawResults: any[]): SearchResult[] {
  const seen = new Set<string>();
  return rawResults
    .filter((item) => {
      const key = `${item.entity_type}-${item.entity_id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((item) => ({
      entity_type: item.entity_type,
      entity_id: item.entity_id,
      title: highlightMatch(item.title, item.match_terms),
      subtitle: item.subtitle ? highlightMatch(item.subtitle, item.match_terms) : "",
      url: item.url,
      relevance: item.relevance,
      created_at: item.created_at,
    }));
}

function highlightMatch(text: string, terms?: string[]): string {
  if (!terms || !text) return text;
  let highlighted = text;
  terms.forEach((term) => {
    if (!term) return;
    const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });
  return highlighted;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} 