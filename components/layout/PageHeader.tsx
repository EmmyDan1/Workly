"use client";

import { useEffect, useRef, useState } from "react";

import {
  LightningIcon,
  BellIcon,
  PlusIcon,
  FolderIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import {
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

import { PageConfig } from "@/pageConfig";
import { useProject } from "@/components/providers/ProjectProvider";
import { useTeam } from "@/components/providers/TeamProvider";

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
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);

  const quickCreateRef = useRef<HTMLDivElement>(null);

  const { openCreateProjectModal } = useProject();
  const { openCreateTeamModal } = useTeam();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quickCreateRef.current &&
        !quickCreateRef.current.contains(event.target as Node)
      ) {
        setIsQuickCreateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateProject = () => {
    setIsQuickCreateOpen(false);
    openCreateProjectModal();
  };

const handleCreateTeam = () => {
  console.log("New team clicked");
  console.log("openCreateTeamModal:", openCreateTeamModal);

  setIsQuickCreateOpen(false);
  openCreateTeamModal();
};

  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border px-4 sm:px-6">
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

        <span className="mt-1 text-[14px] font-medium text-foreground">
          {title}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-1">
      
        <button
          type="button"
          aria-label="Activity"
          title="Activity"
          className="rounded-md p-2 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <LightningIcon size={18} weight="regular" />
        </button>

    
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="rounded-md p-2 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <BellIcon size={18} weight="regular" />
        </button>

  
        <div ref={quickCreateRef} className="relative">
          <button
            type="button"
            aria-label="Quick Create"
            aria-expanded={isQuickCreateOpen}
            title="Quick Create"
            onClick={() =>
              setIsQuickCreateOpen((previous) => !previous)
            }
            className={`rounded-md p-2 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground ${
              isQuickCreateOpen ? "bg-surface-hover text-foreground" : ""
            }`}
          >
            <PlusIcon size={18} weight="regular" />
          </button>

          {isQuickCreateOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-xl">
              <button
                type="button"
                onClick={handleCreateProject}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-surface-hover"
              >
                <FolderIcon
                  size={18}
                  weight="regular"
                  className="text-foreground-muted"
                />

                <div>
                  <p className="font-medium">New project</p>
                  <p className="text-xs text-foreground-muted">
                    Create a new project
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleCreateTeam}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-surface-hover"
              >
                <UsersThreeIcon
                  size={18}
                  weight="regular"
                  className="text-foreground-muted"
                />

                <div>
                  <p className="font-medium">New team</p>
                  <p className="text-xs text-foreground-muted">
                    Create a new team
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>

      
        {headerAction && (
          <button
            type="button"
            aria-label={headerAction.label}
            title={headerAction.label}
            onClick={onHeaderAction}
            className="rounded-md p-2 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <headerAction.icon size={17} strokeWidth={2} />
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;