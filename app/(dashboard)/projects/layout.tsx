"use client";
import EditProjectModal from "@/components/projects/EditProjectModal";
import { useProject } from "@/components/providers/ProjectProvider";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { editingProjectId } = useProject();

  return (
    <>
      {children}

      <EditProjectModal
        key={editingProjectId ?? "none"}
      />
    </>
  );
}