"use client";
import { useProject } from "../providers/ProjectProvider";
import { useState } from "react";
import { usePathname } from "next/navigation";
import TabHeader from "../navigation/TabHeader";
import PageHeader from "./PageHeader";
import SearchHeader from "../search/SearchHeader";
import { pageConfig, type PageConfig } from "@/pageConfig";

type RightSectionProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  searchOpen: boolean;
  children: React.ReactNode;
  toggleSearch: () => void;
};

const RightSection = ({
  children,
  isSidebarOpen,
  toggleSidebar,
}: RightSectionProps) => {
  const pathname = usePathname();
  const { openCreateProjectModal } = useProject();

  const isProjectOverview =
    pathname.startsWith("/projects/") && pathname !== "/projects";

  const config: PageConfig = isProjectOverview
    ? {
        title: "Project Overview",
        mode: "title",
        tabs: [],
      }
    : (pageConfig[pathname] ?? {
        title: "Page",
        mode: "title",
        tabs: [],
      });

  const [activeTab, setActiveTab] = useState(config.tabs[0]?.id ?? "");

  return (
    <main className="flex min-h-0 flex-1 flex-col bg-surface w-full max-w-[1269px] mx-auto lg:rounded-4xl lg:mt-2 lg:h-[650px]">
      {pathname === "/search" ? (
        <SearchHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      ) : (
        <PageHeader
          title={config.title}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          headerAction={isProjectOverview ? undefined : config.headerAction}
          onHeaderAction={() => {
            if (config.headerAction?.action === "create-project") {
              openCreateProjectModal();
            }
          }}
        />
      )}

      {config.tabs.length > 0 && (
        <TabHeader
          tabs={config.tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      <section className="min-h-0 flex-1 overflow-auto p-6">{children}</section>
    </main>
  );
};

export default RightSection;
