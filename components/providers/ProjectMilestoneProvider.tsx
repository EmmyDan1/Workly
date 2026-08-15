"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ProjectMilestone } from "@/types/projects";

type ProjectMilestoneContextType = {
  milestones: ProjectMilestone[];

  addMilestone: (milestone: ProjectMilestone) => void;

  updateMilestone: (
    id: string,
    updates: Partial<ProjectMilestone>,
  ) => void;

  deleteMilestone: (id: string) => void;

  getProjectMilestones: (
    projectId: string,
  ) => ProjectMilestone[];
};

const ProjectMilestoneContext =
  createContext<ProjectMilestoneContextType | null>(null);

const MILESTONE_STORAGE_KEY =
  "project-management-milestones";

export const ProjectMilestoneProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [milestones, setMilestones] = useState<
    ProjectMilestone[]
  >(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedMilestones = localStorage.getItem(
        MILESTONE_STORAGE_KEY,
      );

      return storedMilestones
        ? JSON.parse(storedMilestones)
        : [];
    } catch (error) {
      console.error(
        "Failed to load milestones:",
        error,
      );

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      MILESTONE_STORAGE_KEY,
      JSON.stringify(milestones),
    );
  }, [milestones]);

  const addMilestone = (
    milestone: ProjectMilestone,
  ) => {
    setMilestones((previousMilestones) => [
      ...previousMilestones,
      milestone,
    ]);
  };

  const updateMilestone = (
    id: string,
    updates: Partial<ProjectMilestone>,
  ) => {
    setMilestones((previousMilestones) =>
      previousMilestones.map((milestone) =>
        milestone.id === id
          ? {
              ...milestone,
              ...updates,
            }
          : milestone,
      ),
    );
  };

  const deleteMilestone = (id: string) => {
    setMilestones((previousMilestones) =>
      previousMilestones.filter(
        (milestone) => milestone.id !== id,
      ),
    );
  };

  const getProjectMilestones = (projectId: string) => {
    return milestones.filter(
      (milestone) =>
        milestone.projectId === projectId,
    );
  };

  return (
    <ProjectMilestoneContext.Provider
      value={{
        milestones,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        getProjectMilestones,
      }}
    >
      {children}
    </ProjectMilestoneContext.Provider>
  );
};

export const useProjectMilestone = () => {
  const context = useContext(
    ProjectMilestoneContext,
  );

  if (!context) {
    throw new Error(
      "useProjectMilestone must be used inside ProjectMilestoneProvider",
    );
  }

  return context;
};