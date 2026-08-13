"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProjectActionsMenu from "./ProjectActionsMenu";
import DeleteProjectDialog from "./DeleteProjectDialog";
import { useProject } from "../providers/ProjectProvider";
import type { Project } from "@/types/projects";
import { projectGrid } from "./ProjectsTableHeader";
import ProjectRowDesktop from "./ProjectRowDesktop";
import ProjectRowMobile from "./ProjectRowMobile";
import { useNotification } from "@/components/providers/NotificationProvider";

type ProjectItemProps = {
  project: Project;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  const router = useRouter();
  const { notify } = useNotification();
  const { deleteProject, openEditProjectModal } = useProject();
  const [actionsOpen, setActionsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleOpenProject = () => {
    router.push(`/projects/${project.id}`);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setMenuPosition({
      top: event.clientY + 6,
      left: Math.min(event.clientX, window.innerWidth - 216),
    });

    setActionsOpen(true);
  };
  return (
    <>
      <ProjectRowDesktop
        project={project}
        projectGrid={projectGrid}
        actionsOpen={actionsOpen}
        onOpen={handleOpenProject}
        onContextMenu={handleContextMenu}
        onActions={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();

          setMenuPosition({
            top: rect.bottom + 6,
            left: rect.right - 208,
          });

          setActionsOpen((open) => !open);
        }}
      />

      <ProjectRowMobile
        project={project}
        actionsOpen={actionsOpen}
        onOpen={handleOpenProject}
        onContextMenu={handleContextMenu}
        onActions={(event) => {
          event.stopPropagation();

          const rect = event.currentTarget.getBoundingClientRect();

          setMenuPosition({
            top: rect.bottom + 6,
            left: Math.max(8, rect.right - 208),
          });

          setActionsOpen((open) => !open);
        }}
      />

      {deleteOpen && (
        <DeleteProjectDialog
          projectName={project.name}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={() => {
            deleteProject(project.id);
            setDeleteOpen(false);
            notify.success("Project deleted successfully");
          }}
        />
      )}

      {actionsOpen && (
        <ProjectActionsMenu
          project={project}
          position={menuPosition}
          onOpen={() => {
            setActionsOpen(false);
            router.push(`/projects/${project.id}`);
          }}
          onEdit={() => {
            setActionsOpen(false);
            openEditProjectModal(project.id);
          }}
          onCopyLink={async () => {
            await navigator.clipboard.writeText(
              `${window.location.origin}/projects/${project.id}`,
            );
             notify.success("Project link copied successfully") 
            setActionsOpen(false);
          }}
          onDelete={() => {
            setActionsOpen(false);
            setDeleteOpen(true);
          }}
          onClose={() => setActionsOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectItem;
