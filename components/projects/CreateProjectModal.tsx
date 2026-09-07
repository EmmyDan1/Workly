"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useProject } from "../providers/ProjectProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useTeam } from "../providers/TeamProvider";
import ProjectIcon from "./ProjectIcon";
import CreateProjectForm from "./CreateProjectForm";

import type { ProjectIcon as ProjectIconType } from "@/types/projects";

const CreateProjectModal = () => {
  const { isCreateProjectOpen, closeCreateProjectModal, addProject } =
    useProject();
  const { notify } = useNotification();
  const { teams } = useTeam();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "planned",
    priority: "medium",
    lead: "Daniel",
    targetDate: "",
    icon: "folder" as ProjectIconType,
    emoji: undefined as string | undefined,
    teamId: "",
  });

  const [error, setError] = useState("");

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getTargetDate = (value: string): string | undefined => {
    const today = new Date();

    if (value === "No date" || !value) {
      return undefined;
    }

    if (value === "This month") {
      return new Date(today.getFullYear(), today.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];
    }

    if (value === "Next month") {
      return new Date(today.getFullYear(), today.getMonth() + 2, 0)
        .toISOString()
        .split("T")[0];
    }

    if (value === "This quarter") {
      const quarterEndMonth = Math.floor(today.getMonth() / 3) * 3 + 2;

      return new Date(today.getFullYear(), quarterEndMonth + 1, 0)
        .toISOString()
        .split("T")[0];
    }

    return undefined;
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Give your project a name before creating it.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a project.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teamId: form.teamId,
          name: form.name.trim(),
          description: form.description.trim(),
          status: form.status,
          health: "on-track",
          priority: form.priority,
          targetDate: getTargetDate(form.targetDate),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      addProject({
        ...data,
        teamId: data.team_id,
        targetDate: data.target_date,
        updatedAt: data.updated_at,
        lead: data.lead_id,
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
        teamId: "",
      });

      setError("");
      closeCreateProjectModal();
    } catch (error) {
      console.error("Failed to create project:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create project",
      );
    }
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
        <div className="min-h-0 flex-1 overflow-y-auto">
          <CreateProjectForm
            form={form}
            updateForm={updateForm}
            error={error}
            onSubmit={handleCreateProject}
            onClose={closeCreateProjectModal}
            teams={teams}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
