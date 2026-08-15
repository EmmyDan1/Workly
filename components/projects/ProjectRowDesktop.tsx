
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

export const statusLabels: Record<string, string> = {
  backlog: "Backlog",
  planned: "Planned",
  "in-progress": "In Progress",
  completed: "Completed",
  canceled: "Canceled",
};


const priorityStyles: Record<string, string> = {
  low: "bg-surface text-foreground-muted",
  medium: "bg-surface text-foreground",
  high: "bg-amber-500/10 text-amber-500",
  urgent: "bg-red-500/10 text-red-500",
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
      className={`group relative hidden w-full cursor-pointer items-center gap-4 border-b border-border/70 px-4 py-3.5 transition-colors hover:bg-surface-hover lg:grid ${projectGrid}`}
    >
      {/* Project */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-surface transition-colors group-hover:border-border">
          {project.emoji ? (
            <span className="text-base leading-none">{project.emoji}</span>
          ) : (
            <ProjectIcon
              icon={project.icon}
              size={17}
              className="text-foreground-muted transition-colors group-hover:text-foreground"
            />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[13px] font-medium tracking-[-0.01em] text-foreground">
              {project.name}
            </h3>

            <ChevronRight
              size={13}
              strokeWidth={1.8}
              className="shrink-0 text-foreground-muted opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </div>

          {project.description && (
            <p className="mt-0.5 truncate text-[11px] leading-4 text-foreground-muted">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Health */}
      <div className="flex min-w-0 items-center gap-2">
        <Circle
          size={7}
          fill="currentColor"
          strokeWidth={0}
          className={healthStyles[project.health]}
        />

        <span className="truncate text-[11px] capitalize text-foreground-muted">
          {project.health.replace("-", " ")}
        </span>
      </div>

      {/* Priority */}
      <div className="min-w-0 text-xs">
        <span className={priorityStyles[project.priority]}>
          {project.priority}
        </span>
      </div>

      {/* Lead */}
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
          {project.lead?.charAt(0).toUpperCase()}
        </div>

        <span className="truncate text-[11px] text-foreground-muted">
          {project.lead}
        </span>
      </div>

      {/* Target date */}
      <span className="truncate text-[11px] tabular-nums text-foreground-muted">
        {project.targetDate}
      </span>

      {/* Issues */}
      <div className="text-[11px] tabular-nums text-foreground-muted">
        <ProjectIssueCount projectId={project.id} />
      </div>

      {/* Status */}
      <div className="min-w-0">
        <span className="inline-flex max-w-full truncate rounded-md border border-border/80 bg-surface px-2 py-1 text-[10px] font-medium text-foreground-muted">
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
          className={`rounded-md p-1.5 text-foreground-muted transition-all duration-150 hover:bg-surface hover:text-foreground ${
            actionsOpen
              ? "bg-surface text-foreground"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <MoreHorizontal size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default ProjectRowDesktop;
