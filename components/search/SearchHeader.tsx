"use client";

import { PanelLeftOpen, PanelLeftClose, Search } from "lucide-react";
type SearchHeaderProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const SearchHeader = ({ toggleSidebar, isSidebarOpen }: SearchHeaderProps) => {



  return (
    <header className="h-14 border-b border-border flex items-center px-6">
      <button
        className="rounded-md text-foreground-muted hover:bg-surface-hover lg:hidden mr-3"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <PanelLeftClose size={16} strokeWidth={2} />
        ) : (
          <PanelLeftOpen size={16} strokeWidth={2} />
        )}
      </button>
      <div className="flex h-8 w-full items-center gap-3 rounded-lg bg-surface-hover px-4 transition-colors focus-within:ring-2 focus-within:ring-accent/10 group">
        <Search size={18} className="text-foreground-muted shrink-0" />

        <input
          type="text"
          placeholder="Find issues, projects, initiatives and documents..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-subtle outline-none"
        />
        <p className="text-xs text-foreground-muted bg-sidebar px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100  transition-transform duration-300 ease-in-out">
          Ctrl+K
        </p>
      </div>
    </header>
  );
};

export default SearchHeader;
