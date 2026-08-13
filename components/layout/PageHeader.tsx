"use client";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
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
    <header
      className="h-14 border-b border-border flex items-center px-6 shrink-0 justify-between "
      title={title}
    >
      <button
        className="rounded-md text-foreground-muted hover:bg-surface-hover lg:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <PanelLeftClose size={16} strokeWidth={2} />
        ) : (
          <PanelLeftOpen size={16} strokeWidth={2} />
        )}
      </button>

      <h1 className=" ml-4 text-sm font-semibold ">{title}</h1>
      {headerAction && (
        <button
          type="button"
          onClick={onHeaderAction}
          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
        >
          <headerAction.icon size={16} strokeWidth={2} />

          <span>{headerAction.label}</span>
        </button>
      )}
    </header>
  );
};

export default PageHeader;
