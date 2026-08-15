"use client";

import { useState } from "react";
import { X } from "lucide-react";

import Button from "@/components/ui/Button";
import { useProjectMilestone } from "@/components/providers/ProjectMilestoneProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import type { ProjectMilestone } from "@/types/projects";

type AddMilestoneModalProps = {
  projectId: string;
  onClose: () => void;
};

const AddMilestoneModal = ({
  projectId,
  onClose,
}: AddMilestoneModalProps) => {
  const { addMilestone } = useProjectMilestone();
  const { notify } = useNotification();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Give your milestone a name.");
      return;
    }

    const milestone: ProjectMilestone = {
      id: crypto.randomUUID(),
      projectId,
      title: title.trim(),
      description: description.trim(),
      targetDate: targetDate || undefined,
      completed: false,
    };

    addMilestone(milestone);

    notify.success("Milestone added successfully.");

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-milestone-title"
        className="w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 px-6 py-6">
          <div className="min-w-0">
            <h2
              id="add-milestone-title"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              Add milestone
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-foreground-muted">
              Create a meaningful deliverable for this project.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="ml-auto rounded-lg p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 pb-6">
            {/* Title */}
            <div>
              <label
                htmlFor="milestone-title"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                Milestone
              </label>

              <input
                id="milestone-title"
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError("");
                }}
                placeholder="Launch beta"
                autoFocus
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="milestone-description"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                Description
              </label>

              <textarea
                id="milestone-description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setError("");
                }}
                placeholder="What should be delivered?"
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-xs leading-5 text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </div>

            {/* Target date */}
            <div>
              <label
                htmlFor="milestone-date"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                Target date
              </label>

              <input
                id="milestone-date"
                type="date"
                value={targetDate}
                onChange={(event) => {
                  setTargetDate(event.target.value);
                  setError("");
                }}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none transition focus:border-foreground/30"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-border bg-surface/40 px-6 py-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Add milestone
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMilestoneModal;