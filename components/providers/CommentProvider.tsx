"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { IssueComment } from "@/types/projects";
import { useActivity } from "@/components/providers/ActivityProvider";

type CommentContextType = {
  comments: IssueComment[];

  addComment: (comment: IssueComment) => void;

  updateComment: (
    id: string,
    updates: Partial<IssueComment>,
  ) => void;

  deleteComment: (id: string) => void;

  deleteIssueComments: (issueId: string) => void;

  getIssueComments: (issueId: string) => IssueComment[];
};

const CommentContext = createContext<CommentContextType | null>(null);

const COMMENTS_STORAGE_KEY = "project-management-comments";

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { addActivity } = useActivity();
  const [comments, setComments] = useState<IssueComment[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);

      return storedComments ? JSON.parse(storedComments) : [];
    } catch (error) {
      console.error("Failed to load comments:", error);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment: IssueComment) => {
    setComments((previousComments) => [...previousComments, comment]);

    addActivity({
      id: crypto.randomUUID(),
      issueId: comment.issueId,
      actorId: comment.authorId,
      type: "comment_added",
      createdAt: new Date().toISOString(),
    });
  };

  const updateComment = (id: string, updates: Partial<IssueComment>) => {
    setComments((previousComments) =>
      previousComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              ...updates,
            }
          : comment,
      ),
    );
  };

  const deleteComment = (id: string) => {
    setComments((previousComments) =>
      previousComments.filter((comment) => comment.id !== id),
    );
  };

  const getIssueComments = (issueId: string) => {
    return comments.filter((comment) => comment.issueId === issueId);
  };

  const deleteIssueComments = (issueId: string) => {
  setComments((previousComments) =>
    previousComments.filter(
      (comment) => comment.issueId !== issueId,
    ),
  );
};

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
        updateComment,
        deleteComment,
        getIssueComments,
        deleteIssueComments
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error("useComment must be used inside CommentProvider");
  }

  return context;
};
