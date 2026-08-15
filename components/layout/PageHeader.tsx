"use client";

import {
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

import { PageConfig } from "@/pageConfig";

type PageHeaderProps = {
  title: string;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  headerAction?: PageConfig["headerAction"];
  onHeaderAction?: () => void;
};

const PageHeader = ({
  title,
  toggleSidebar,
  isSidebarOpen,
  headerAction,
  onHeaderAction,
}: PageHeaderProps) => {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border px-4 sm:px-6">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground lg:hidden"
        >
          {isSidebarOpen ? (
            <PanelLeftClose size={16} strokeWidth={2} />
          ) : (
            <PanelLeftOpen size={16} strokeWidth={2} />
          )}
        </button>

        <span className="text-[14px] mt-1 font-medium text-foreground">
          {title}
        </span>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-1">
        {headerAction && (
          <button
            type="button"
            aria-label={headerAction.label}
            title={headerAction.label}
            onClick={onHeaderAction}
            className="rounded-md p-1.5 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <headerAction.icon size={16} strokeWidth={2} />
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;