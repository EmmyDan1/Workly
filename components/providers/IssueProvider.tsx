"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Issue, IssueActivity } from "@/types/projects";
import { useActivity } from "./ActivityProvider";
import { useComment } from "@/components/providers/CommentProvider";

type IssueContextType = {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;

  getProjectIssues: (projectId: string) => Issue[];
};

const IssueContext = createContext<IssueContextType | null>(null);

const ISSUES_STORAGE_KEY = "project-management-issues";

export const IssueProvider = ({ children }: { children: React.ReactNode }) => {
  const { deleteIssueComments } = useComment();
  const { deleteIssueActivities } = useActivity();
  const { addActivity } = useActivity();
  const [issues, setIssues] = useState<Issue[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedIssues = localStorage.getItem(ISSUES_STORAGE_KEY);

      return storedIssues ? JSON.parse(storedIssues) : [];
    } catch (error) {
      console.error("Failed to load issues:", error);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues));
  }, [issues]);

  const addIssue = (issue: Issue) => {
    setIssues((prevIssues) => [...prevIssues, issue]);

    addActivity({
      id: crypto.randomUUID(),
      issueId: issue.id,
      actorId: "daniel",
      type: "created",
      createdAt: new Date().toISOString(),
    });
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    const currentIssue = issues.find((issue) => issue.id === id);

    if (!currentIssue) {
      return;
    }

    const updatedIssue = {
      ...currentIssue,
      ...updates,
    };

    const newActivities: IssueActivity[] = [];

    if (
      updates.status !== undefined &&
      updates.status !== currentIssue.status
    ) {
      newActivities.push({
        id: crypto.randomUUID(),
        issueId: currentIssue.id,
        actorId: "daniel",
        type: "status_changed",
        fromValue: currentIssue.status,
        toValue: updates.status,
        createdAt: new Date().toISOString(),
      });
    }

    if (
      updates.priority !== undefined &&
      updates.priority !== currentIssue.priority
    ) {
      newActivities.push({
        id: crypto.randomUUID(),
        issueId: currentIssue.id,
        actorId: "daniel",
        type: "priority_changed",
        fromValue: currentIssue.priority,
        toValue: updates.priority,
        createdAt: new Date().toISOString(),
      });
    }

    if (
      updates.assigneeId !== undefined &&
      updates.assigneeId !== currentIssue.assigneeId
    ) {
      newActivities.push({
        id: crypto.randomUUID(),
        issueId: currentIssue.id,
        actorId: "daniel",
        type: "assignee_changed",
        fromValue: currentIssue.assigneeId,
        toValue: updates.assigneeId,
        createdAt: new Date().toISOString(),
      });
    }

    if (updates.title !== undefined && updates.title !== currentIssue.title) {
      newActivities.push({
        id: crypto.randomUUID(),
        issueId: currentIssue.id,
        actorId: "daniel",
        type: "title_changed",
        fromValue: currentIssue.title,
        toValue: updates.title,
        createdAt: new Date().toISOString(),
      });
    }

    if (
      updates.description !== undefined &&
      updates.description !== currentIssue.description
    ) {
      newActivities.push({
        id: crypto.randomUUID(),
        issueId: currentIssue.id,
        actorId: "daniel",
        type: "description_changed",
        createdAt: new Date().toISOString(),
      });
    }

    setIssues((prevIssues) =>
      prevIssues.map((issue) => (issue.id === id ? updatedIssue : issue)),
    );

    newActivities.forEach((activity) => {
      addActivity(activity);
    });
  };
  const deleteIssue = (id: string) => {
    setIssues((previousIssues) =>
      previousIssues.filter((issue) => issue.id !== id),
    );

    deleteIssueComments(id);
    deleteIssueActivities(id);
  };

  const getProjectIssues = (projectId: string) => {
    return issues.filter((issue) => issue.projectId === projectId);
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        addIssue,
        updateIssue,
        deleteIssue,
        getProjectIssues,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};

export const useIssue = () => {
  const context = useContext(IssueContext);

  if (!context) {
    throw new Error("useIssue must be used inside IssueProvider");
  }

  return context;
};
