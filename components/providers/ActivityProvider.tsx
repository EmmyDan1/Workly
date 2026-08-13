"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { IssueActivity } from "@/types/projects";

type ActivityContextType = {
  activities: IssueActivity[];

  addActivity: (activity: IssueActivity) => void;

  getIssueActivities: (issueId: string) => IssueActivity[];
  deleteIssueActivities: (issueId: string) => void;
};

const ActivityContext = createContext<ActivityContextType | null>(null);

const ACTIVITY_STORAGE_KEY = "project-management-activities";

export const ActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activities, setActivities] = useState<IssueActivity[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedActivities = localStorage.getItem(ACTIVITY_STORAGE_KEY);

      return storedActivities ? JSON.parse(storedActivities) : [];
    } catch (error) {
      console.error("Failed to load activities:", error);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity: IssueActivity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };

  const getIssueActivities = (issueId: string) => {
    return activities.filter((activity) => activity.issueId === issueId);
  };
  const deleteIssueActivities = (issueId: string) => {
    setActivities((previousActivities) => {
      const remainingActivities = previousActivities.filter(
        (activity) => activity.issueId !== issueId,
      );

      return remainingActivities;
    });
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        getIssueActivities,
        deleteIssueActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity must be used inside ActivityProvider");
  }

  return context;
};
