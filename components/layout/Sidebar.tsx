"use client";
import { useState } from "react";
import { navItems } from "@/data/navItems";
import Link from "next/link";

import SidebarAccount from "./SidebarAccount";
type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  searchOpen: boolean;
  toggleSearch: () => void;
};

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  toggleSearch,
}: SidebarProps) => {


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
        <SidebarAccount  />

        <nav className="mt-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground-muted transition-all duration-200 hover:bg-[#94a3b8]/60 hover:text-sidebar-foreground"
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
