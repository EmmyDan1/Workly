"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useIssue } from "@/components/providers/IssueProvider";
import type { Issue, IssuePriority, IssueStatus } from "@/types/projects";
import { useMember } from "@/components/providers/MemberProvider";
import { useProject } from "@/components/providers/ProjectProvider";

type EditIssueModalProps = {
  issue: Issue;
  open: boolean;
  onClose: () => void;
};

const EditIssueModal = ({ issue, open, onClose }: EditIssueModalProps) => {
  const { members } = useMember();
  const { projects } = useProject();

  const project = projects.find((item) => item.id === issue.projectId);

  const projectMembers = members.filter((member) =>
    project?.memberIds?.includes(member.id),
  );
  const { updateIssue } = useIssue();
  const { notify } = useNotification();
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description ?? "");
  const [status, setStatus] = useState<IssueStatus>(issue.status);
  const [priority, setPriority] = useState<IssuePriority>(issue.priority);
  const [assigneeId, setAssigneeId] = useState(issue.assigneeId ?? "");

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) return;

    updateIssue(issue.id, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assigneeId,
     updatedAt: new Date().toISOString(),
    });
    notify.success("Issue updated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Edit issue
            </h2>

            <p className="mt-0.5 text-xs text-foreground-muted">
              Update the issue details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-foreground-muted transition hover:bg-surface hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-5 py-5">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Title
            </label>

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as IssueStatus)
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Priority
              </label>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as IssuePriority)
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none"
              >
                <option value="no-priority">No priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>
        {/* Assignee */}
        <div className="w-full ">
          <label className="mb-1.5 ml-6 block text-xs font-medium text-foreground">
            Assignee
          </label>

          <select
            value={assigneeId}
            onChange={(event) => setAssigneeId(event.target.value)}
            className="mx-auto block h-9 w-full max-w-[320px] md:max-w-[480px] rounded-lg border border-border bg-surface px-3 text-xs text-foreground outline-none"
  >
            <option value="">Unassigned</option>

            {projectMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition hover:opacity-90"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIssueModal;
