"use client";

import { Check, Circle, MoreHorizontal } from "lucide-react";

import { useProjectMilestone } from "@/components/providers/ProjectMilestoneProvider";
import { useState } from "react";
import EditMilestoneModal from "./EditMilestoneModal";
import DeleteMilestoneDialog from "./DeleteMilestoneDialog";
import type { ProjectMilestone } from "@/types/projects";
import { useNotification } from "@/components/providers/NotificationProvider";

type ProjectMilestoneListProps = {
  projectId: string;
};

const ProjectMilestoneList = ({ projectId }: ProjectMilestoneListProps) => {
  const {
  getProjectMilestones,
  updateMilestone,
  deleteMilestone,
} = useProjectMilestone();
  const [actionsOpen, setActionsOpen] = useState<string | null>(null);
  const [editingMilestone, setEditingMilestone] =
    useState<ProjectMilestone | null>(null);
  const [deletingMilestone, setDeletingMilestone] =
    useState<ProjectMilestone | null>(null);

  const { notify } = useNotification();

  const milestones = getProjectMilestones(projectId);

  if (milestones.length === 0) {
    return (
      <div className="mt-5 rounded-lg border border-dashed border-border px-5 py-8 text-center">
        <p className="text-sm text-foreground-muted">No milestones yet</p>

        <p className="mt-1 text-xs text-foreground-muted">
          Add milestones to track meaningful project deliverables.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 divide-y divide-border rounded-lg border border-border">
      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          className="group flex items-center gap-3 px-4 py-3"
        >
          {/* Completion */}
          <button
            type="button"
            aria-label={
              milestone.completed
                ? `Mark ${milestone.title} incomplete`
                : `Mark ${milestone.title} complete`
            }
            onClick={() =>
              updateMilestone(milestone.id, {
                completed: !milestone.completed,
              })
            }
            className="shrink-0 text-foreground-muted transition hover:text-foreground"
          >
            {milestone.completed ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                <Check size={12} strokeWidth={2.5} />
              </span>
            ) : (
              <Circle size={19} strokeWidth={1.6} />
            )}
          </button>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <p
              className={`truncate text-xs font-medium ${
                milestone.completed
                  ? "text-foreground-muted line-through"
                  : "text-foreground"
              }`}
            >
              {milestone.title}
            </p>

            {milestone.description && (
              <p className="mt-0.5 truncate text-[11px] text-foreground-muted">
                {milestone.description}
              </p>
            )}
          </div>

          {/* Date */}
          {milestone.targetDate && (
            <span
              className={`shrink-0 text-[11px] ${
                milestone.completed
                  ? "text-foreground-muted"
                  : "text-foreground-muted"
              }`}
            >
              {milestone.targetDate}
            </span>
          )}

          {/* Actions */}
          <div className="relative shrink-0">
            <button
              type="button"
              aria-label={`More options for ${milestone.title}`}
              aria-expanded={actionsOpen === milestone.id}
              onClick={() =>
                setActionsOpen((current) =>
                  current === milestone.id ? null : milestone.id,
                )
              }
              className={`rounded-md p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground ${
                actionsOpen === milestone.id
                  ? "bg-surface text-foreground"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <MoreHorizontal size={15} />
            </button>

            {actionsOpen === milestone.id && (
              <div className="absolute right-0 top-full z-20 mt-1 w-32 rounded-lg border border-border bg-background p-1 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMilestone(milestone);
                    setActionsOpen(null);
                  }}
                  className="flex w-full rounded-md px-3 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeletingMilestone(milestone);
                    setActionsOpen(null);
                  }}
                  className="flex w-full rounded-md px-3 py-2 text-left text-xs text-red-500 transition hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {editingMilestone && (
        <EditMilestoneModal
          milestoneId={editingMilestone.id}
          title={editingMilestone.title}
          description={editingMilestone.description}
          targetDate={editingMilestone.targetDate}
          onClose={() => setEditingMilestone(null)}
        />
      )}

      {deletingMilestone && (
        <DeleteMilestoneDialog
          milestoneName={deletingMilestone.title}
          onCancel={() => setDeletingMilestone(null)}
          onConfirm={() => {
            deleteMilestone(deletingMilestone.id);
            setDeletingMilestone(null);

            notify.success("Milestone deleted successfully.");
          }}
        />
      )}
    </div>
  );
};

export default ProjectMilestoneList;
