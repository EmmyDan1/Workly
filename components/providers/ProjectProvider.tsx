"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { Project } from "@/types/projects";

type ProjectContextType = {
  projects: Project[];

  isCreateProjectOpen: boolean;
  editingProjectId: string | null;

  openCreateProjectModal: () => void;
  closeCreateProjectModal: () => void;

  openEditProjectModal: (projectId: string) => void;
  closeEditProjectModal: () => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

const PROJECTS_STORAGE_KEY = "project-management-projects";

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);

      const parsedProjects: Project[] = storedProjects
        ? JSON.parse(storedProjects)
        : [];

      return parsedProjects.map((project) => ({
        ...project,
        teamId: project.teamId ?? undefined,
      }));
    } catch (error) {
      console.error("Failed to load projects:", error);

      return [];
    }
  });

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Persist projects
  useEffect(() => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const openCreateProjectModal = () => {
    setIsCreateProjectOpen(true);
  };

  const closeCreateProjectModal = () => {
    setIsCreateProjectOpen(false);
  };
  const openEditProjectModal = (projectId: string) => {
    setEditingProjectId(projectId);
  };

  const closeEditProjectModal = () => {
    setEditingProjectId(null);
  };

  const addProject = (project: Project) => {
    setProjects((prevProjects) => [...prevProjects, project]);

    closeCreateProjectModal();
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, ...updates } : project,
      ),
    );
  };
  const deleteProject = (id: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id),
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isCreateProjectOpen,
        openCreateProjectModal,
        closeCreateProjectModal,
        editingProjectId,
        openEditProjectModal,
        closeEditProjectModal,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used inside ProjectProvider");
  }

  return context;
};
