import * as React from "react";
import { Loader2 } from "lucide-react";

export const SearchLoading = () => (
  <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
    <Loader2 className="h-8 w-8 mb-2 animate-spin text-blue-400" />
    <div className="text-lg font-medium">Searching...</div>
    <div className="text-xs mt-2 text-gray-400">Please wait while we find your results.</div>
  </div>
); 