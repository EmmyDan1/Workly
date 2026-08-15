"use client";

import Link from "next/link";
import { ArrowUpRight, CircleCheck, FolderKanban, UsersRound } from "lucide-react";

import { useProject } from "@/components/providers/ProjectProvider";
import ProjectIcon from "@/components/projects/ProjectIcon";

export default function DashboardPage() {
  const { projects } = useProject();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      {/* Workspace header */}
      <div className="mb-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          Workspace
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Manage your projects and team activity
        </p>
      </div>

      {/* Quick actions */}
      <section className="mb-12">
        <div className="divide-y divide-border border-y border-border">
          <Link
            href="/issues"
            className="group flex items-center gap-3 py-3.5 transition-colors hover:bg-surface-hover -mx-4 px-4"
          >
            <CircleCheck
              size={18}
              strokeWidth={1.5}
              className="text-foreground-muted"
            />
            <span className="text-sm font-medium text-foreground">
              My issues
            </span>
            <ArrowUpRight
              size={15}
              className="ml-auto text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>

          <Link
            href="/projects"
            className="group flex items-center gap-3 py-3.5 transition-colors hover:bg-surface-hover -mx-4 px-4"
          >
            <FolderKanban
              size={18}
              strokeWidth={1.5}
              className="text-foreground-muted"
            />
            <span className="text-sm font-medium text-foreground">
              Projects
            </span>
            <ArrowUpRight
              size={15}
              className="ml-auto text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>

          <Link
            href="/teams"
            className="group flex items-center gap-3 py-3.5 transition-colors hover:bg-surface-hover -mx-4 px-4"
          >
            <UsersRound
              size={18}
              strokeWidth={1.5}
              className="text-foreground-muted"
            />
            <span className="text-sm font-medium text-foreground">
              Team
            </span>
            <ArrowUpRight
              size={15}
              className="ml-auto text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        </div>
      </section>

      {/* Projects section */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Projects
          </h2>
          {projects.length > 0 && (
            <Link
              href="/projects"
              className="text-xs text-foreground-muted transition-colors hover:text-foreground"
            >
              View all →
            </Link>
          )}
        </div>

        <div className="divide-y divide-border border-y border-border">
          {projects.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-foreground-muted">
                No projects yet.
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group flex items-center gap-3 py-4 transition-colors hover:bg-surface-hover -mx-4 px-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-surface">
                  <ProjectIcon
                    icon={project.icon}
                    size={17}
                    className="text-foreground-muted"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {project.name}
                  </p>
                  {project.description && (
                    <p className="mt-0.5 truncate text-xs text-foreground-muted">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="hidden shrink-0 items-center gap-2 sm:flex">
                  <span className="text-xs text-foreground-muted">
                    {project.members} member{project.members !== 1 ? "s" : ""}
                  </span>
                </div>

                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}