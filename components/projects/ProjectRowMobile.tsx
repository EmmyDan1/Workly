"use client";

import { MoreHorizontal } from "lucide-react";

import ProjectIcon from "./ProjectIcon";
import type { Project } from "@/types/projects";
import ProjectIssueCount from "./issues/ProjectIssueCount";

type ProjectRowMobileProps = {
  project: Project;
  actionsOpen: boolean;
  onOpen: () => void;
  onActions: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const healthStyles: Record<string, string> = {
  "on-track": "text-emerald-500",
  "at-risk": "text-amber-500",
  "off-track": "text-red-500",
};

const statusLabels: Record<string, string> = {
  backlog: "Backlog",
  planned: "Planned",
  "in-progress": "In Progress",
  completed: "Completed",
  canceled: "Canceled",
};

const ProjectRowMobile = ({
  project,
  actionsOpen,
  onOpen,
  onActions,
  onContextMenu,
}: ProjectRowMobileProps) => {
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
      className="flex w-full cursor-pointer items-center gap-3 border-b border-border px-4 py-3.5 transition-colors hover:bg-surface-hover lg:hidden"
    >
      {/* Icon */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
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

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium text-foreground">
            {project.name}
          </h3>

          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${healthStyles[
              project.health
            ].replace("text-", "bg-")}`}
          />
        </div>

        <div className="mt-1 flex items-center gap-2 text-[11px] text-foreground-muted">
          <span className="capitalize">{statusLabels[project.status]}</span>

          <span>·</span>

          <span className="capitalize">{project.priority}</span>

          <span>·</span>

          <span>
            <ProjectIssueCount projectId={project.id} /> issues
          </span>
        </div>
      </div>

      {/* More */}
      <button
        type="button"
        aria-label={`More options for ${project.name}`}
        aria-expanded={actionsOpen}
        onClick={onActions}
        className={`shrink-0 rounded-md p-2 text-foreground-muted transition hover:bg-surface hover:text-foreground ${
          actionsOpen ? "bg-surface text-foreground" : ""
        }`}
      >
        <MoreHorizontal size={17} />
      </button>
    </div>
  );
};

export default ProjectRowMobile;
