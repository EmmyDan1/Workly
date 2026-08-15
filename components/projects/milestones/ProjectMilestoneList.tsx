"use client";

import {
  Check,
  Circle,
  MoreHorizontal,
} from "lucide-react";

import { useProjectMilestone } from "@/components/providers/ProjectMilestoneProvider";

type ProjectMilestoneListProps = {
  projectId: string;
};

const ProjectMilestoneList = ({
  projectId,
}: ProjectMilestoneListProps) => {
  const {
    getProjectMilestones,
    updateMilestone,
  } = useProjectMilestone();

  const milestones = getProjectMilestones(projectId);

  if (milestones.length === 0) {
    return (
      <div className="mt-5 rounded-lg border border-dashed border-border px-5 py-8 text-center">
        <p className="text-sm text-foreground-muted">
          No milestones yet
        </p>

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
          <button
            type="button"
            aria-label={`More options for ${milestone.title}`}
            className="shrink-0 rounded-md p-1.5 text-foreground-muted opacity-0 transition hover:bg-surface-hover hover:text-foreground group-hover:opacity-100"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectMilestoneList;