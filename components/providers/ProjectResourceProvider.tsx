"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ProjectResource } from "@/types/projects";

type ProjectResourceContextType = {
  resources: ProjectResource[];

  addResource: (resource: ProjectResource) => void;
  updateResource: (
    id: string,
    updates: Partial<ProjectResource>,
  ) => void;
  deleteResource: (id: string) => void;
  getProjectResources: (projectId: string) => ProjectResource[];
};

const ProjectResourceContext =
  createContext<ProjectResourceContextType | null>(null);

const RESOURCE_STORAGE_KEY = "project-management-resources";

export const ProjectResourceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [resources, setResources] = useState<ProjectResource[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedResources = localStorage.getItem(
        RESOURCE_STORAGE_KEY,
      );

      return storedResources ? JSON.parse(storedResources) : [];
    } catch (error) {
      console.error("Failed to load resources:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      RESOURCE_STORAGE_KEY,
      JSON.stringify(resources),
    );
  }, [resources]);

  const addResource = (resource: ProjectResource) => {
    setResources((previousResources) => [
      ...previousResources,
      resource,
    ]);
  };

  const updateResource = (
    id: string,
    updates: Partial<ProjectResource>,
  ) => {
    setResources((previousResources) =>
      previousResources.map((resource) =>
        resource.id === id
          ? {
              ...resource,
              ...updates,
            }
          : resource,
      ),
    );
  };

  const deleteResource = (id: string) => {
    setResources((previousResources) =>
      previousResources.filter(
        (resource) => resource.id !== id,
      ),
    );
  };

  const getProjectResources = (projectId: string) => {
    return resources.filter(
      (resource) => resource.projectId === projectId,
    );
  };

  return (
    <ProjectResourceContext.Provider
      value={{
        resources,
        addResource,
        updateResource,
        deleteResource,
        getProjectResources,
      }}
    >
      {children}
    </ProjectResourceContext.Provider>
  );
};

export const useProjectResource = () => {
  const context = useContext(ProjectResourceContext);

  if (!context) {
    throw new Error(
      "useProjectResource must be used inside ProjectResourceProvider",
    );
  }

  return context;
};