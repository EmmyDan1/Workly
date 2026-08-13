"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useProject } from "../providers/ProjectProvider";
import { useNotification } from "@/components/providers/NotificationProvider";

import ProjectIcon from "./ProjectIcon";
import CreateProjectForm from "./CreateProjectForm";

import type { ProjectIcon as ProjectIconType } from "@/types/projects";

const CreateProjectModal = () => {
  const { isCreateProjectOpen, closeCreateProjectModal, addProject } =
    useProject();
  const { notify } = useNotification();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "planned",
    priority: "medium",
    lead: "Daniel",
    targetDate: "",
    icon: "folder" as ProjectIconType,
    emoji: undefined as string | undefined,
  });

  const [error, setError] = useState("");

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Give your project a name before creating it.");
      return;
    }

    addProject({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status as
        | "backlog"
        | "planned"
        | "in-progress"
        | "completed"
        | "canceled",
      health: "on-track",
      priority: form.priority as "low" | "medium" | "high" | "urgent",
      lead: form.lead || "Daniel",
      members: 1,
      memberIds: ["daniel"],
      targetDate: form.targetDate || "No date",
      updatedAt: "Just now",
      icon: form.icon,
      emoji: form.emoji,
    });
    notify.success("Project created successfully");
    setForm({
      name: "",
      description: "",
      status: "planned",
      priority: "medium",
      lead: "Daniel",
      targetDate: "",
      icon: "folder",
      emoji: undefined,
    });

    setError("");
    closeCreateProjectModal();
  };

  if (!isCreateProjectOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={closeCreateProjectModal}
        className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:max-h-[calc(100vh-3rem)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-7 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface">
              {form.emoji ? (
                <span className="text-xl leading-none">{form.emoji}</span>
              ) : (
                <ProjectIcon
                  icon={form.icon}
                  size={19}
                  className="text-foreground-muted"
                />
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Create project
              </h2>

              <p className="mt-1 text-sm text-foreground-muted">
                Set up a project to organize and track your work.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCreateProjectModal}
            className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
{/* Form */}
<div className="min-h-0 flex-1 overflow-y-auto">
  <CreateProjectForm
    form={form}
    updateForm={updateForm}
    error={error}
    onSubmit={handleCreateProject}
    onClose={closeCreateProjectModal}
  />
</div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
