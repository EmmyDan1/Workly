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
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);



export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        setProjects(
          data.map((project: any) => ({
            ...project,
            teamId: project.team_id,
            targetDate: project.target_date,
            updatedAt: project.updated_at,
            lead: project.lead_name,
            leadName: project.lead_name,
            leadEmail: project.lead_email,
          })),
        );
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

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

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updates.name,
          description: updates.description,
          status: updates.status,
          health: updates.health,
          priority: updates.priority,
          targetDate: updates.targetDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const data = await response.json();

      const updatedProject: Project = {
        ...data,
        teamId: data.team_id,
        targetDate: data.target_date,
        updatedAt: data.updated_at,
        lead: data.lead_name,
        leadName: data.lead_name,
        leadEmail: data.lead_email,
      };

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? updatedProject : project,
        ),
      );
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };
  const deleteProject = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
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
