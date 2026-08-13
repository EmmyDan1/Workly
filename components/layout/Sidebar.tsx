"use client";
import { useState } from "react";
import type { NavItem } from "@/types/navigation";
import Link from "next/link";
import {
  ChevronDown,
  SearchIcon,
  LayoutDashboard,
  FolderKanban,
  UserRound,
  Settings,
  SquarePen,
} from "lucide-react";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  searchOpen: boolean;
  toggleSearch: () => void;
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      route: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      route: "/projects",
      icon: FolderKanban,
    },
    {
      title: "Teams",
      route: "/teams",
      icon: UserRound,
    },
    {
      title: "Settings",
      route: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-border lg:border-none text-sidebar-foreground
    transition-transform duration-100 ease-in-out
    lg:static lg:translate-x-0
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <div className="flex items-center space-x-1 p-1 rounded-lg">
                <p className="bg-accent w-[25px] text-sm rounded-lg items-center flex justify-center">
                  DA
                </p>
                <p>Daniel</p>
              </div>
              <button onClick={() => setIsExpanded(!isExpanded)}>
                <ChevronDown
                  size={16}
                  className="text-sidebar-foreground-muted"
                />
              </button>
            </div>

            <div className="text-sidebar-foreground-muted flex justify-between">
              <Link href="/search" className="">
                <SearchIcon size={14} className="mr-4" />
              </Link>
              <button className="hover:bg-slate-50 p-1 rounded-lg">
                <SquarePen size={14} />
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="absolute top-16 left-4 bg-surface border border-border rounded-lg shadow-lg p-4 w-48 z-10">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/profile"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground-muted transition-colors hover:bg-sidebar-active hover:text-sidebar-foreground"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logout"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground-muted transition-colors hover:bg-sidebar-active hover:text-sidebar-foreground"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <nav className="mt-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground-muted transition-all duration-200 hover:bg-sidebar-active hover:text-sidebar-foreground"
                    onClick={() => {
                      if (isSidebarOpen) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <Icon
                      size={18}
                      className="transition-colors duration-200 group-hover:text-sidebar-foreground"
                    />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
