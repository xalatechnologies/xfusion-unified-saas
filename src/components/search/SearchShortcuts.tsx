
import React from "react";
import { Badge } from "@/components/ui/badge";

export const SearchShortcuts = () => {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
      <div className="p-4">
        <h4 className="font-medium text-sm mb-3">Search Tips</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>Open search</span>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">⌘</Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">K</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Navigate results</span>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">↑</Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">↓</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Select result</span>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">Enter</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Close search</span>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">Esc</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
