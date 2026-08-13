"use client";

import { useParams } from "next/navigation";

import { useProject } from "@/components/providers/ProjectProvider";
import ProjectNavigation from "@/components/projects/ProjectNavigation";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const { projects } = useProject();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  const project = projects.find(
    (item) => item.id === projectId
  );

  // The actual not-found handling remains in page.tsx.
  if (!project) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full flex-col">
      <ProjectNavigation project={project} />

      <div className="min-h-0 flex-1">
        {children}
      </div>
    </div>
  );
}