"use client";

import { useState } from "react";
import { CalendarDays, X } from "lucide-react";

import { useProject } from "@/components/providers/ProjectProvider";
import ProjectIcon from "./ProjectIcon";
import ProjectIconPicker from "./ProjectIconPicker";
import { useNotification } from "@/components/providers/NotificationProvider";

import type {
  ProjectIcon as ProjectIconType,
  ProjectPriority,
  ProjectStatus,
  ProjectHealth,
} from "@/types/projects";

type EditProjectForm = {
  name: string;
  description: string;
  icon: ProjectIconType;
  emoji?: string;
  status: ProjectStatus;
  health: ProjectHealth;
  priority: ProjectPriority;
  lead: string;
  targetDate: string;
};

const EditProjectModal = () => {
  const { projects, editingProjectId, closeEditProjectModal, updateProject } =
    useProject();
  const { notify } = useNotification();
  const project = projects.find((project) => project.id === editingProjectId);

  const [form, setForm] = useState<EditProjectForm | null>(
    project
      ? {
          name: project.name,
          description: project.description ?? "",
          icon: project.icon,
          emoji: project.emoji,
          status: project.status,
          health: project.health,
          priority: project.priority,
          lead: project.lead ?? "",
          targetDate: project.targetDate ?? "",
        }
      : null,
  );

  const [pickerOpen, setPickerOpen] = useState(false);

  if (!editingProjectId || !project || !form) {
    return null;
  }

  const updateForm = <K extends keyof EditProjectForm>(
    field: K,
    value: EditProjectForm[K],
  ) => {
    setForm((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current,
    );
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      return;
    }

    updateProject(project.id, {
      name: form.name.trim(),
      description: form.description.trim(),
      icon: form.icon,
      emoji: form.emoji,
      status: form.status,
      health: form.health,
      priority: form.priority,
      lead: form.lead.trim(),
      targetDate: form.targetDate,
    });

    closeEditProjectModal();
    notify.success("Project Updated Successfully!");
  };
  

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[2px]">
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Edit project
            </h2>

            <p className="mt-1 text-xs text-foreground-muted">
              Update your project details and properties.
            </p>
          </div>

          <button
            type="button"
            onClick={closeEditProjectModal}
            className="rounded-lg p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
            aria-label="Close edit project modal"
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Identity */}
            <div>
              <label className="mb-2 block text-xs font-medium text-foreground">
                Project
              </label>

              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setPickerOpen((open) => !open)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition hover:border-foreground-muted hover:bg-surface-hover"
                    aria-label="Change project icon"
                  >
                    {form.emoji ? (
                      <span className="text-lg leading-none">{form.emoji}</span>
                    ) : (
                      <ProjectIcon
                        icon={form.icon}
                        size={19}
                        className="text-foreground"
                      />
                    )}
                  </button>

                  {pickerOpen && (
                    <ProjectIconPicker
                      currentIcon={form.icon}
                      currentEmoji={form.emoji}
                      onIconChange={(icon) => {
                        updateForm("icon", icon);
                        updateForm("emoji", undefined);
                      }}
                      onEmojiChange={(emoji) => {
                        updateForm("emoji", emoji);
                      }}
                      onClose={() => setPickerOpen(false)}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <input
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    placeholder="Project name"
                    className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-xs font-medium text-foreground">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateForm("description", event.target.value)
                }
                placeholder="What is this project about?"
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
              />
            </div>

            {/* Properties */}
            <div>
              <label className="mb-3 block text-xs font-medium text-foreground">
                Properties
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Status */}
                <label className="space-y-1.5">
                  <span className="text-[11px] text-foreground-muted">
                    Status
                  </span>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateForm("status", event.target.value as ProjectStatus)
                    }
                    className="h-9 w-full rounded-lg border border-border bg-surface px-2.5 text-xs text-foreground outline-none focus:border-foreground-muted"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </label>

                {/* Health */}
                <label className="space-y-1.5">
                  <span className="text-[11px] text-foreground-muted">
                    Health
                  </span>

                  <select
                    value={form.health}
                    onChange={(event) =>
                      updateForm("health", event.target.value as ProjectHealth)
                    }
                    className="h-9 w-full rounded-lg border border-border bg-surface px-2.5 text-xs text-foreground outline-none focus:border-foreground-muted"
                  >
                    <option value="on-track">On track</option>
                    <option value="at-risk">At risk</option>
                    <option value="off-track">Off track</option>
                  </select>
                </label>

                {/* Priority */}
                <label className="space-y-1.5">
                  <span className="text-[11px] text-foreground-muted">
                    Priority
                  </span>

                  <select
                    value={form.priority}
                    onChange={(event) =>
                      updateForm(
                        "priority",
                        event.target.value as ProjectPriority,
                      )
                    }
                    className="h-9 w-full rounded-lg border border-border bg-surface px-2.5 text-xs text-foreground outline-none focus:border-foreground-muted"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </label>

                {/* Lead */}
                <label className="space-y-1.5">
                  <span className="text-[11px] text-foreground-muted">
                    Lead
                  </span>

                  <input
                    value={form.lead}
                    onChange={(event) => updateForm("lead", event.target.value)}
                    className="h-9 w-full rounded-lg border border-border bg-surface px-2.5 text-xs text-foreground outline-none focus:border-foreground-muted"
                  />
                </label>

                {/* Target date */}
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-[11px] text-foreground-muted">
                    Target date
                  </span>

                  <div className="relative">
                    <CalendarDays
                      size={14}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted"
                    />

                    <input
                      value={form.targetDate}
                      onChange={(event) =>
                        updateForm("targetDate", event.target.value)
                      }
                      placeholder="No date"
                      className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-xs text-foreground outline-none focus:border-foreground-muted"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={closeEditProjectModal}
            className="rounded-lg px-3.5 py-2 text-xs font-medium text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!form.name.trim()}
            className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
