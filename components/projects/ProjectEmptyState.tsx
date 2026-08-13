"use client";

import { FolderKanban, Plus, Sparkles } from "lucide-react";

import { useProject } from "../providers/ProjectProvider";

const ProjectEmptyState = () => {
  const { openCreateProjectModal } = useProject();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface shadow-sm">
          <FolderKanban
            size={28}
            strokeWidth={1.7}
            className="text-foreground-muted"
          />
        </div>

        {/* Content */}
        <div className="mt-7">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground-muted">
            <Sparkles size={12} />
            Your workspace
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Build something worth shipping.
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-foreground-muted sm:text-[15px]">
            Create your first project to organize work, track progress,
            and keep everything your team is building in one place.
          </p>
        </div>

        {/* Action */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={openCreateProjectModal}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background shadow-sm transition-all hover:-translate-y-px hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Plus size={16} strokeWidth={2} />
            Create project
          </button>

          <p className="text-xs text-foreground-muted">
            You can change project settings anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectEmptyState;