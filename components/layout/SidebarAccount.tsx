"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  SearchIcon,
  SquarePen,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

const SidebarAccount = () => {
  const { user, logout } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative p-3" ref={accountMenuRef}>
      <div className="flex items-center justify-between">
        {/* Account trigger */}
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="group flex min-w-0 items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-sidebar-active/25"
          aria-expanded={isExpanded}
          aria-haspopup="menu"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">
            {user ? getInitials(user.name) : "?"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-sidebar-foreground">
              {user?.name ?? "Loading..."}
            </p>

            <p className="truncate text-[10px] text-sidebar-foreground-muted">
              Personal workspace
            </p>
          </div>

          <ChevronDown
            size={14}
            className={`ml-1 shrink-0 text-sidebar-foreground-muted transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Header actions */}
        <div className="flex items-center gap-1 text-sidebar-foreground-muted">
          <Link
            href="/search"
            className="rounded-lg p-2 transition-colors hover:bg-sidebar-active/25 hover:text-sidebar-foreground"
            aria-label="Search"
          >
            <SearchIcon size={14} />
          </Link>

          <button
            type="button"
            onClick={() => setIsQuickCreateOpen((prev) => !prev)}
            className="rounded-lg p-2 transition-colors hover:bg-sidebar-active/25 hover:text-sidebar-foreground"
            aria-label="Quick create"
          >
            <SquarePen size={14} />
          </button>

          {isQuickCreateOpen && (
            <div className="absolute right-0 top-10 z-50 w-48 rounded-xl border border-border bg-sidebar p-1.5 shadow-xl">
              <button
                type="button"
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-active/25"
              >
                New issue
              </button>

              <button
                type="button"
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-active/25"
              >
                New project
              </button>

              <button
                type="button"
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-active/25x"
              >
                New team
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account menu */}
      {isExpanded && (
        <div
          role="menu"
          className="absolute left-3 right-3 top-[4.25rem] z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          {/* Identity */}
          <div className="border-b border-border px-3.5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">
                {user ? getInitials(user.name) : "?"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-foreground">
                  {user?.name ?? "Loading..."}
                </p>

                <p className="truncate text-[11px] text-foreground-muted">
                  {user?.email ?? ""}
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="p-1.5">
            <Link
              href="/profile"
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[12px] font-medium text-foreground-muted transition-colors hover:bg-sidebar-active hover:text-foreground"
              role="menuitem"
            >
              <User size={15} />
              <span>Profile</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[12px] font-medium text-foreground-muted transition-colors hover:bg-sidebar-active hover:text-foreground"
              role="menuitem"
            >
              <Settings size={15} />
              <span>Settings</span>
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-border p-1.5">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-[12px] font-medium text-red-500 transition-colors hover:bg-red-500/[0.06]"
              role="menuitem"
            >
              <LogOut size={15} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarAccount;
