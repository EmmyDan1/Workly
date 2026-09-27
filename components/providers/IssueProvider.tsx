"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Issue, IssueActivity } from "@/types/projects";
import { useActivity } from "./ActivityProvider";
import { useComment } from "@/components/providers/CommentProvider";

type IssueContextType = {
  issues: Issue[];
  addIssue: (issue: Issue) => Promise<void>;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;

  getProjectIssues: (projectId: string) => Issue[];
};

const IssueContext = createContext<IssueContextType | null>(null);

export const IssueProvider = ({ children }: { children: React.ReactNode }) => {
  const { deleteIssueComments } = useComment();
  const { deleteIssueActivities } = useActivity();
  const { addActivity } = useActivity();
  const [issues, setIssues] = useState<Issue[]>([]);

  const addIssue = async (issue: Issue) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId: issue.projectId,
          title: issue.title,
          description: issue.description,
          status: issue.status,
          priority: issue.priority,
          assigneeId: issue.assigneeId || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create issue");
      }

      const data = await response.json();

      const newIssue: Issue = {
        ...issue,
        id: data.id,
        projectId: data.project_id,
        title: data.title,
        description: data.description ?? "",
        status: data.status,
        priority: data.priority,
        assigneeId: data.assignee_id ?? "",
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      setIssues((prevIssues) => [...prevIssues, newIssue]);

      addActivity({
        id: crypto.randomUUID(),
        issueId: newIssue.id,
        actorId: "daniel",
        type: "created",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
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
