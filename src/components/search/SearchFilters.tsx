
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchFiltersProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
}

const entityTypes = [
  { id: 'organizations', label: 'Organizations', icon: '🏢' },
  { id: 'users', label: 'Users', icon: '👤' },
  { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
  { id: 'documentation', label: 'Documentation', icon: '📚' },
];

export const SearchFilters = ({ selectedTypes, onTypesChange }: SearchFiltersProps) => {
  const handleTypeToggle = (typeId: string, checked: boolean) => {
    if (checked) {
      onTypesChange([...selectedTypes, typeId]);
    } else {
      onTypesChange(selectedTypes.filter(id => id !== typeId));
    }
  };

  const clearAllFilters = () => {
    onTypesChange(['organizations', 'users', 'subscriptions', 'documentation']);
  };

  const hasActiveFilters = selectedTypes.length !== 4;

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={`h-8 ${hasActiveFilters ? 'border-primary bg-primary/10' : ''}`}
          >
            <Filter className="h-3 w-3 mr-1" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 h-4 min-w-4 text-xs">
                {selectedTypes.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="start">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Search Filters</h4>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {entityTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={(checked) => 
                      handleTypeToggle(type.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={type.id} 
                    className="text-sm font-normal flex items-center gap-2 cursor-pointer"
                  >
                    <span>{type.icon}</span>
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {selectedTypes.map((typeId) => {
        const type = entityTypes.find(t => t.id === typeId);
        return type ? (
          <Badge 
            key={typeId} 
            variant="secondary" 
            className="text-xs px-2 py-1 flex items-center gap-1"
          >
            <span>{type.icon}</span>
            {type.label}
            <Button
              variant="ghost"
              size="sm"
              className="h-3 w-3 p-0 ml-1"
              onClick={() => handleTypeToggle(typeId, false)}
            >
              <X className="h-2 w-2" />
            </Button>
          </Badge>
        ) : null;
      })}
    </div>
  );
};
