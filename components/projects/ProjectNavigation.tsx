"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { Project } from "@/types/projects";
import ProjectIcon from "./ProjectIcon";

type ProjectNavigationProps = {
  project: Project;
};

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  const pathname = usePathname();

  const projectBasePath = `/projects/${project.id}`;

  const tabs = [
    {
      label: "Overview",
      href: projectBasePath,
    },
    {
      label: "Issues",
      href: `${projectBasePath}/issues`,
    },
    {
      label: "Documents",
      href: `${projectBasePath}/documents`,
    },
    {
      label: "Members",
      href: `${projectBasePath}/members`,
    },
  ];

  const isTabActive = (href: string) => {
    if (href === projectBasePath) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <div className="shrink-0 border-b border-border bg-background">
      {/* Breadcrumb */}
      <div className="flex h-12 items-center px-6">
        <nav
          aria-label="Project navigation"
          className="flex min-w-0 items-center gap-1.5 text-sm"
        >
          {/* Workspace */}
          <Link
            href="/dashboard"
            className="shrink-0 rounded-md px-1.5 py-1 font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            Daniel
          </Link>

          <ChevronRight
            size={14}
            className="shrink-0 text-foreground-muted/60"
          />

          {/* Projects */}
          <Link
            href="/projects"
            className="shrink-0 rounded-md px-1.5 py-1 font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            Projects
          </Link>

          <ChevronRight
            size={14}
            className="shrink-0 text-foreground-muted/60"
          />

          {/* Current project */}
          <div className="flex min-w-0 items-center gap-2 rounded-md px-1.5 py-1">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
              {project.emoji ? (
                <span className="text-sm leading-none">{project.emoji}</span>
              ) : (
                <ProjectIcon
                  icon={project.icon}
                  size={13}
                  className="text-foreground-muted"
                />
              )}
            </div>

            <span className="max-w-[220px] truncate font-medium text-foreground">
              {project.name}
            </span>
          </div>
        </nav>
      </div>

      {/* Project tabs */}
      <div className="px-6">
        <nav
          aria-label="Project sections"
          className="flex items-center gap-1 overflow-x-auto"
        >
          {tabs.map((tab) => {
            const active = isTabActive(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {tab.label}

                {active && (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-foreground" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ProjectNavigation;
