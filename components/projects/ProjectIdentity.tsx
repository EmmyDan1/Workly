"use client";

import { useState } from "react";
import type { Project } from "@/types/projects";

import { useProject } from "@/components/providers/ProjectProvider";
import ProjectIconPicker from "./ProjectIconPicker";
import ProjectIcon from "./ProjectIcon";

type ProjectIdentityProps = {
  project: Project;
};

const ProjectIdentity = ({ project }: ProjectIdentityProps) => {
  const { updateProject } = useProject();

  const [pickerOpen, setPickerOpen] = useState(false);

  const [editingName, setEditingName] = useState(false);

  const [editingSummary, setEditingSummary] = useState(false);

  const [name, setName] = useState(project.name);
  const [summary, setSummary] = useState(project.description);

  const saveName = () => {
    const trimmed = name.trim();

    if (!trimmed) {
      setName(project.name);
      setEditingName(false);
      return;
    }

    updateProject(project.id, {
      name: trimmed,
    });

    setEditingName(false);
  };

  const saveSummary = () => {
    updateProject(project.id, {
      description: summary.trim(),
    });

    setEditingSummary(false);
  };

  return (
    <section className="relative py-8">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setPickerOpen((open) => !open)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-foreground-muted transition hover:border-foreground-muted hover:bg-surface-hover hover:text-foreground"
            aria-label="Change project icon"
          >
            {project.emoji ? (
              <span className="text-2xl leading-none">{project.emoji}</span>
            ) : (
              <ProjectIcon
                icon={project.icon}
                size={22}
                className="text-foreground"
              />
            )}
          </button>

          {pickerOpen && (
            <ProjectIconPicker
              currentIcon={project.icon}
              currentEmoji={project.emoji}
              onIconChange={(icon) =>
                updateProject(project.id, {
                  icon,
                  emoji: undefined,
                })
              }
              onEmojiChange={(emoji) =>
                updateProject(project.id, {
                  emoji,
                })
              }
              onClose={() => setPickerOpen(false)}
            />
          )}
        </div>

        {/* Name + summary */}
        <div className="min-w-0 flex-1">
          {editingName ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveName();
                }

                if (e.key === "Escape") {
                  setName(project.name);
                  setEditingName(false);
                }
              }}
              className="w-full bg-transparent text-2xl font-semibold tracking-tight text-foreground outline-none"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditingName(true)}
              className="block max-w-full text-left"
            >
              <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground transition hover:text-foreground-muted">
                {project.name}
              </h1>
            </button>
          )}

          {editingSummary ? (
            <input
              autoFocus
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              onBlur={saveSummary}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveSummary();
                }

                if (e.key === "Escape") {
                  setSummary(project.description);
                  setEditingSummary(false);
                }
              }}
              placeholder="Add a short summary..."
              className="mt-1 w-full bg-transparent text-sm text-foreground-muted outline-none placeholder:text-foreground-muted"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditingSummary(true)}
              className="mt-1 block max-w-full text-left"
            >
              <p className="truncate text-sm text-foreground-muted transition hover:text-foreground">
                {project.description || "Add a short summary..."}
              </p>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectIdentity;
