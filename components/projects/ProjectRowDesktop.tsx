"use client";

import { ChevronRight, Circle, MoreHorizontal } from "lucide-react";

import ProjectIcon from "./ProjectIcon";
import type { Project } from "@/types/projects";
import ProjectIssueCount from "./issues/ProjectIssueCount";

type ProjectRowDesktopProps = {
  project: Project;
  projectGrid: string;
  actionsOpen: boolean;
  onOpen: () => void;
  onActions: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const healthStyles: Record<string, string> = {
  "on-track": "text-emerald-500",
  "at-risk": "text-amber-500",
  "off-track": "text-red-500",
};

const priorityStyles: Record<string, string> = {
  low: "bg-surface text-foreground-muted",
  medium: "bg-surface text-foreground",
  high: "bg-amber-500/10 text-amber-500",
  urgent: "bg-red-500/10 text-red-500",
};

const statusLabels: Record<string, string> = {
  backlog: "Backlog",
  planned: "Planned",
  "in-progress": "In Progress",
  completed: "Completed",
  canceled: "Canceled",
};

const ProjectRowDesktop = ({
  project,
  projectGrid,
  actionsOpen,
  onOpen,
  onActions,
  onContextMenu,
}: ProjectRowDesktopProps) => {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onContextMenu={onContextMenu}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`group relative hidden w-full cursor-pointer items-center gap-4 px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-hover lg:grid ${projectGrid}`}
    >
      {/* Project */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
          {project.emoji ? (
            <span className="text-base leading-none">{project.emoji}</span>
          ) : (
            <ProjectIcon
              icon={project.icon}
              size={17}
              className="text-foreground-muted"
            />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[13px] font-medium text-foreground">
              {project.name}
            </h3>

            <ChevronRight
              size={13}
              className="shrink-0 text-foreground-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </div>

          {project.description && (
            <p className="mt-0.5 truncate text-[11px] text-foreground-muted">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Health */}
      <div className="flex min-w-0 items-center gap-2">
        <Circle
          size={8}
          fill="currentColor"
          className={healthStyles[project.health]}
        />

        <span className="truncate text-xs text-foreground-muted">
          {project.health.replace("-", " ")}
        </span>
      </div>

      {/* Priority */}
      <div>
        <span
          className={`inline-flex rounded-md px-2 py-1 text-[11px] font-medium capitalize ${priorityStyles[project.priority]}`}
        >
          {project.priority}
        </span>
      </div>

      {/* Lead */}
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
          {project.lead?.charAt(0).toUpperCase()}
        </div>

        <span className="truncate text-xs text-foreground">{project.lead}</span>
      </div>

      {/* Target date */}
      <span className="truncate text-xs text-foreground-muted">
        {project.targetDate}
      </span>


      <div className="text-xs tabular-nums text-foreground-muted">
        <ProjectIssueCount projectId={project.id} />
      </div>

      {/* Status */}
      <div>
        <span className="inline-flex rounded-md border border-border bg-surface px-2 py-1 text-[11px] text-foreground-muted">
          {statusLabels[project.status]}
        </span>
      </div>

      {/* More */}
      <div
        className="relative flex justify-end overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={`More options for ${project.name}`}
          aria-expanded={actionsOpen}
          onClick={onActions}
          className={`rounded-md p-1.5 text-foreground-muted transition hover:bg-surface hover:text-foreground ${
            actionsOpen
              ? "bg-surface text-foreground"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <MoreHorizontal size={15} />
        </button>
      </div>
    </div>
  );
};

export default ProjectRowDesktop;
