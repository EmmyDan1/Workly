"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useMember } from "@/components/providers/MemberProvider";
import { useProject } from "@/components/providers/ProjectProvider";
import { useIssue } from "@/components/providers/IssueProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
type CreateIssueModalProps = {
  projectId: string;
  open: boolean;
  onClose: () => void;
};

const CreateIssueModal = ({
  projectId,
  open,
  onClose,
}: CreateIssueModalProps) => {
  const { addIssue } = useIssue();
  const { notify } = useNotification();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { members } = useMember();
  const { projects } = useProject();
  const [assigneeId, setAssigneeId] = useState("");
  const [priority, setPriority] = useState<
    "no-priority" | "low" | "medium" | "high" | "urgent"
  >("medium");

  if (!open) return null;

  const project = projects.find((item) => item.id === projectId);

  const projectMembers = members.filter((member) =>
    project?.memberIds?.includes(member.id),
  );


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;
    console.log("CREATING ISSUE FOR PROJECT:", projectId);
    const now = new Date().toISOString();
    addIssue({
      id: crypto.randomUUID(),
      projectId,
      title: title.trim(),
      description: description.trim(),
      status: "todo",
      priority,
      assigneeId,
      createdAt: now,
      updatedAt: now,
    });
    notify.success("Issue created successfully");
    setTitle("");
    setDescription("");
    setPriority("medium");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Create issue
            </h2>

            <p className="mt-0.5 text-xs text-foreground-muted">
              Track a piece of work for this project.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Title
            </label>

            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2.5 text-xs text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as
                    | "no-priority"
                    | "low"
                    | "medium"
                    | "high"
                    | "urgent",
                )
              }
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-xs text-foreground outline-none"
            >
              <option value="no-priority">No priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Assignee
            </label>

            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-xs text-foreground outline-none"
            >
              <option value="">Select assignee</option>

              {projectMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xs font-medium text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!title.trim() || !assigneeId}
            className="rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIssueModal;
