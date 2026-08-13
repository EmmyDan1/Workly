"use client";

import type { Project } from "@/types/projects";
import ProjectIdentity from "./ProjectIdentity";
import ProjectProperties from "./ProjectProperties";

type ProjectOverviewProps = {
  project: Project;
};

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Project identity */}
      <ProjectIdentity project={project} />

      <ProjectProperties project={project} />

      {/* Resources */}
      <section className="border-b border-border py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Resources</h2>

          <div className="flex items-center gap-2">
            <button className="rounded-md px-2.5 py-1.5 text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground">
              + Add document
            </button>

            <button className="rounded-md px-2.5 py-1.5 text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground">
              + Add link
            </button>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="border-b border-border py-7">
        <h2 className="text-sm font-semibold text-foreground">Description</h2>

        <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-foreground-muted">
          {project.description || "Add a description for this project."}
        </p>
      </section>

      {/* Milestones */}
      <section className="py-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Milestones
            </h2>

            <p className="mt-1 text-xs text-foreground-muted">
              Break this project into meaningful deliverables.
            </p>
          </div>

          <button className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-hover">
            + Add milestone
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-dashed border-border px-5 py-8 text-center">
          <p className="text-sm text-foreground-muted">No milestones yet</p>
        </div>
      </section>
    </div>
  );
};

export default ProjectOverview;
