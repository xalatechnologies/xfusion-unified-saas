import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { SearchResult } from "@/lib/database/search";

interface SearchResultPreviewProps {
  result: SearchResult;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchResultPreview = ({ result, open, onOpenChange }: SearchResultPreviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold text-lg text-gray-900">{result.title}</span>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {result.entity_type}
          </Badge>
        </div>
        {result.subtitle && (
          <div className="text-gray-600 mb-2 text-sm">{result.subtitle}</div>
        )}
        <div className="text-xs text-gray-400 mb-4">
          Created: {format(new Date(result.created_at), "PPpp")}
        </div>
        {/* Placeholder for summary or extra info */}
        <div className="text-sm text-gray-700">
          <em>More details coming soon...</em>
        </div>
        <a
          href={result.url}
          className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium"
        >
          Go to detail page
        </a>
      </DialogContent>
    </Dialog>
  );
}; 