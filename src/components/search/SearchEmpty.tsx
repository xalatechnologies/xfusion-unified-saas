import * as React from "react";
import { Search } from "lucide-react";

export const SearchEmpty = ({ query }: { query: string }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
    <Search className="h-8 w-8 mb-2 text-gray-300" />
    <div className="text-lg font-medium">No results found</div>
    {query && (
      <div className="text-sm mt-1">No matches for <span className="font-semibold">"{query}"</span></div>
    )}
    <div className="text-xs mt-2 text-gray-400">Try a different search term or check your spelling.</div>
  </div>
); 