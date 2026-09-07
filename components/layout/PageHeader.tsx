"use client";

import { useEffect, useRef, useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";
import {
  LightningIcon,
  BellIcon,
  PlusIcon,
  FolderIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

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

  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotification();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (quickCreateRef.current && !quickCreateRef.current.contains(target)) {
        setIsQuickCreateOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
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

        <div ref={notificationRef} className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
            title="Notifications"
            onClick={() => setIsNotificationsOpen((previous) => !previous)}
            className={`relative rounded-md p-2 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground ${
              isNotificationsOpen ? "bg-surface-hover text-foreground" : ""
            }`}
          >
            <BellIcon size={18} weight="regular" />

            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-foreground" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-xs text-foreground-muted">
                    {unreadCount > 0
                      ? `${unreadCount} unread`
                      : "You're all caught up"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-foreground-muted transition-colors hover:text-foreground"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications */}
              <div className="max-h-[380px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover">
                      <BellIcon
                        size={18}
                        weight="regular"
                        className="text-foreground-muted"
                      />
                    </div>

                    <p className="text-sm font-medium text-foreground">
                      No notifications
                    </p>

                    <p className="mt-1 max-w-[220px] text-xs leading-5 text-foreground-muted">
                      Updates about your projects and teams will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id);
                        }
                      }}
                      className={`flex w-full gap-3 border-b border-border px-4 py-3.5 text-left transition-colors last:border-b-0 hover:bg-surface-hover ${
                        !notification.read ? "bg-surface-hover/40" : ""
                      }`}
                    >
                      <div className="mt-1.5 shrink-0">
                        {!notification.read ? (
                          <span className="block h-2 w-2 rounded-full bg-foreground" />
                        ) : (
                          <span className="block h-2 w-2 rounded-full border border-border" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-foreground-muted">
                          {notification.message}
                        </p>

                        <p className="mt-2 text-[11px] text-foreground-muted">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={quickCreateRef} className="relative">
          <button
            type="button"
            aria-label="Quick Create"
            aria-expanded={isQuickCreateOpen}
            title="Quick Create"
            onClick={() => setIsQuickCreateOpen((previous) => !previous)}
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
