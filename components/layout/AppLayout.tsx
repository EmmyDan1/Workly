"use client";
import { ProjectProvider } from "../providers/ProjectProvider";
import RightSection from "./RightSection";
import Sidebar from "./Sidebar";
import { useState } from "react";
type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };
  return (
    <ProjectProvider>
    <div className="flex min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        searchOpen={searchOpen}
        toggleSearch={toggleSearch}
      />
      <RightSection
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
       
        searchOpen={searchOpen}
        toggleSearch={toggleSearch}
      >
        {children}
      </RightSection>
      
    </div>
    </ProjectProvider>
  );
};
export default AppLayout;
