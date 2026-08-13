"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import type { IssueComment } from "@/types/projects";
import type { ProjectMember } from "@/types/projects";

type IssueCommentsProps = {
  issueId: string;
  comments: IssueComment[];
  members: ProjectMember[];
  onAddComment: (comment: IssueComment) => void;
  onUpdateComment: (id: string, updates: Partial<IssueComment>) => void;
  onDeleteComment: (id: string) => void;
};

const IssueComments = ({
  issueId,
  comments,
  members,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}: IssueCommentsProps) => {
  const [body, setBody] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [editingBody, setEditingBody] = useState("");

  const startEditing = (comment: IssueComment) => {
    setEditingCommentId(comment.id);
    setEditingBody(comment.body);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingBody("");
  };

  const saveEditing = (commentId: string) => {
    const trimmedBody = editingBody.trim();

    if (!trimmedBody) {
      return;
    }

    onUpdateComment(commentId, {
      body: trimmedBody,
      updatedAt: new Date().toISOString(),
    });

    cancelEditing();
  };

  const handleDelete = (commentId: string) => {
    onDeleteComment(commentId);

    if (editingCommentId === commentId) {
      cancelEditing();
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedBody = body.trim();

    if (!trimmedBody) {
      return;
    }

    const now = new Date().toISOString();

    onAddComment({
      id: crypto.randomUUID(),
      issueId,
      authorId: "daniel",
      body: trimmedBody,
      createdAt: now,
      updatedAt: now,
    });

    setBody("");
  };

  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold text-foreground">Comments</h2>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 rounded-xl border border-border bg-surface p-3"
      >
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Leave a comment..."
          rows={3}
          className="w-full resize-none bg-transparent text-xs text-foreground outline-none placeholder:text-foreground-muted"
        />

        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!body.trim()}
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={13} />
            Comment
          </button>
        </div>
      </form>

      {/* Comments */}
      <div className="mt-6 space-y-5">
        {comments.length === 0 ? (
          <p className="text-xs text-foreground-muted">No comments yet.</p>
        ) : (
          comments.map((comment) => {
            const author = members.find(
              (member) => member.id === comment.authorId,
            );

            return (
              <article key={comment.id} className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {author?.name.charAt(0).toUpperCase() ?? "?"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-xs font-medium text-foreground">
                      {author?.name ?? "Unknown member"}
                    </p>

                    <p className="text-[10px] text-foreground-muted">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {editingCommentId === comment.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editingBody}
                        onChange={(event) => setEditingBody(event.target.value)}
                        rows={3}
                        autoFocus
                        className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-xs leading-5 text-foreground outline-none focus:border-foreground-muted"
                      />

                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="rounded-md px-2.5 py-1.5 text-[11px] font-medium text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={() => saveEditing(comment.id)}
                          disabled={!editingBody.trim()}
                          className="rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="mt-1.5 whitespace-pre-wrap text-xs leading-5 text-foreground-muted">
                        {comment.body}
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => startEditing(comment)}
                          className="text-[10px] font-medium text-foreground-muted transition hover:text-foreground"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(comment.id)}
                          className="text-[10px] font-medium text-foreground-muted transition hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};

export default IssueComments;
