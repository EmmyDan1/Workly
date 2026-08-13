"use client";
import SearchEmptyState from "@/components/search/SearchEmptyState";
import SearchHeader from "@/components/search/SearchHeader";
import { useState } from "react";

type SearchPageProp = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const SearchPage = ({toggleSidebar, isSidebarOpen}: SearchPageProp) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      
      <SearchEmptyState />
    </div>
  );
};

export default SearchPage;
