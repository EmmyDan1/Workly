"use client";

import { useState } from "react";
import { CalendarDays, UserRound } from "lucide-react";

import type { Project, ProjectPriority, ProjectStatus } from "@/types/projects";

import { useProject } from "@/components/providers/ProjectProvider";
import ProjectMembers from "@/components/projects/members/ProjectMembers";

import {
  statusOptions,
  priorityOptions,
  leadOptions,
  targetDateOptions,
} from "../../data/projectOptions";

import ProjectPropertyDropdown, {
  ProjectPropertyOption,
} from "./ProjectPropertyDropdown";

type ProjectPropertiesProps = {
  project: Project;
};

type OpenProperty = "status" | "priority" | "lead" | "targetDate" | null;

const ProjectProperties = ({ project }: ProjectPropertiesProps) => {
  const { updateProject } = useProject();

  const [openProperty, setOpenProperty] = useState<OpenProperty>(null);

  const toggleProperty = (property: OpenProperty) => {
    setOpenProperty((current) => (current === property ? null : property));
  };

  const selectStatus = (status: ProjectStatus) => {
    updateProject(project.id, { status });
    setOpenProperty(null);
  };

  const selectPriority = (priority: ProjectPriority) => {
    updateProject(project.id, { priority });
    setOpenProperty(null);
  };

  const selectLead = (lead: string) => {
    updateProject(project.id, { lead });
    setOpenProperty(null);
  };

  const selectTargetDate = (targetDate: string) => {
    updateProject(project.id, { targetDate });
    setOpenProperty(null);
  };

  const currentStatus = statusOptions.find(
    (option) => option.value === project.status,
  );

  return (
    <section className="border-b border-border py-5">
      <div className="flex flex-wrap items-center gap-2">

        <span className="mr-1 text-xs font-medium text-foreground-muted">
          Properties
        </span>

        {/* Status */}
        <ProjectPropertyDropdown
          label={currentStatus?.label ?? "Status"}
          icon={
            currentStatus?.icon ? (
              <currentStatus.icon size={13} className="text-foreground-muted" />
            ) : undefined
          }
          open={openProperty === "status"}
          onClick={() => toggleProperty("status")}
        >
          {statusOptions.map((option) => {
            const Icon = option.icon;

            return (
              <ProjectPropertyOption
                key={option.value}
                active={project.status === option.value}
                onClick={() => selectStatus(option.value)}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={14} className="text-foreground-muted" />

                  <span>{option.label}</span>
                </div>
              </ProjectPropertyOption>
            );
          })}
        </ProjectPropertyDropdown>

        {/* Priority */}
        <ProjectPropertyDropdown
          label={
            project.priority.charAt(0).toUpperCase() + project.priority.slice(1)
          }
          open={openProperty === "priority"}
          onClick={() => toggleProperty("priority")}
        >
          {priorityOptions.map((option) => (
            <ProjectPropertyOption
              key={option.value}
              active={project.priority === option.value}
              onClick={() => selectPriority(option.value)}
            >
              <span>{option.label}</span>
            </ProjectPropertyOption>
          ))}
        </ProjectPropertyDropdown>

        {/* Lead */}
        <ProjectPropertyDropdown
          label={project.lead || "No lead"}
          icon={<UserRound size={13} />}
          open={openProperty === "lead"}
          onClick={() => toggleProperty("lead")}
        >
          {leadOptions.map((option) => (
            <ProjectPropertyOption
              key={option.value}
              active={project.lead === option.value}
              onClick={() => selectLead(option.value)}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {option.label.charAt(0)}
                </div>

                <span>{option.label}</span>
              </div>
            </ProjectPropertyOption>
          ))}

          <div className="my-1 border-t border-border" />

          <ProjectPropertyOption
            active={false}
            onClick={() => {
              // Invite flow will connect to workspace members later.
              setOpenProperty(null);
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-border">
                <UserRound size={13} />
              </div>

              <span>Invite people</span>
            </div>
          </ProjectPropertyOption>
        </ProjectPropertyDropdown>
        {/* Members */}
        <ProjectMembers project={project} />

        {/* Target date */}
        <ProjectPropertyDropdown
          label={project.targetDate || "No date"}
          icon={<CalendarDays size={13} />}
          open={openProperty === "targetDate"}
          onClick={() => toggleProperty("targetDate")}
        >
          {targetDateOptions.map((option) => (
            <ProjectPropertyOption
              key={option.value}
              active={project.targetDate === option.value}
              onClick={() => selectTargetDate(option.value)}
            >
              <span>{option.label}</span>
            </ProjectPropertyOption>
          ))}
        </ProjectPropertyDropdown>
      </div>
    </section>
  );
};

export default ProjectProperties;
