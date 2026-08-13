"use client";

import { useProject } from "@/components/providers/ProjectProvider";
import ProjectEmptyState from "@/components/projects/ProjectEmptyState";
import ProjectList from "@/components/projects/ProjectList";
import ProjectsTableHeader from "@/components/projects/ProjectsTableHeader";
import ProjectsToolbar from "@/components/projects/ProjectToolbar";

export default function ProjectsPage() {
  const { projects } = useProject();

  const hasProjects = projects.length > 0;

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <ProjectsToolbar />
      {hasProjects ? (
        <div className="overflow-hidden rounded-xl bg-background">
          <ProjectsTableHeader />

          <ProjectList projects={projects} />
        </div>
      ) : (
        <ProjectEmptyState />
      )}
    </div>
  );
}