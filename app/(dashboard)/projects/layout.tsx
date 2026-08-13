"use client";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
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

      <CreateProjectModal />

      <EditProjectModal
        key={editingProjectId ?? "none"}
      />
    </>
  );
}