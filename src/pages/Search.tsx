import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchModal } from "@/components/Layout/SearchBar";

const SearchPage = () => {
  const [open, setOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Keep modal open on mount
  useEffect(() => {
    setOpen(true);
  }, []);

  // Close modal navigates back
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      navigate(-1);
    }
  }, [navigate]);

  // Optionally, pass query/type to SearchModal via context or props if needed

  return <SearchModal open={open} onOpenChange={handleOpenChange} />;
};

export default SearchPage; 