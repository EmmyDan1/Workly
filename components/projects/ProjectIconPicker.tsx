"use client";

import { useState } from "react";
import { Check, Search, Smile, X } from "lucide-react";

import type { ProjectIcon } from "@/types/projects";

import { projectEmojiOptions, projectIconOptions } from "./projectIconOptions";

type ProjectIconPickerProps = {
  currentIcon: ProjectIcon;
  currentEmoji?: string;
  onIconChange: (icon: ProjectIcon) => void;
  onEmojiChange: (emoji: string) => void;
  onClose: () => void;
};

type PickerTab = "icons" | "emoji";

const ProjectIconPicker = ({
  currentIcon,
  currentEmoji,
  onIconChange,
  onEmojiChange,
  onClose,
}: ProjectIconPickerProps) => {
  const [activeTab, setActiveTab] = useState<PickerTab>("icons");

  const [search, setSearch] = useState("");

  const filteredIcons = projectIconOptions.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-black/10">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-medium text-foreground">Project icon</h3>

          <p className="mt-0.5 text-xs text-foreground-muted">
            Choose an icon or emoji
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          aria-label="Close icon picker"
        >
          <X size={15} />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-3 pt-2">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("icons");
              setSearch("");
            }}
            className={`rounded-md px-3 py-2 text-xs font-medium transition ${
              activeTab === "icons"
                ? "bg-surface-hover text-foreground"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Icons
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("emoji");
              setSearch("");
            }}
            className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition ${
              activeTab === "emoji"
                ? "bg-surface-hover text-foreground"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            <Smile size={13} />
            Emoji
          </button>
        </div>
      </div>

      {/* Icon Search */}
      {activeTab === "icons" && (
        <div className="px-3 pt-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3">
            <Search size={14} className="shrink-0 text-foreground-muted" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="h-9 w-full bg-transparent text-xs text-foreground outline-none placeholder:text-foreground-muted"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-h-64 overflow-y-auto p-3">
        {activeTab === "icons" ? (
          <div className="grid grid-cols-6 gap-1">
            {filteredIcons.map((option) => {
              const Icon = option.icon;

              const isSelected = currentIcon === option.value;

              return (
                <button
                  key={option.name}
                  type="button"
                  title={option.name}
                  onClick={() => {
                    onIconChange(option.value);
                    onClose();
                  }}
                  className={`relative flex h-10 items-center justify-center rounded-lg transition ${
                    isSelected
                      ? "bg-surface-hover text-foreground"
                      : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />

                  {isSelected && (
                    <Check size={10} className="absolute right-1 top-1" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-1">
            {projectEmojiOptions.map((emoji) => {
              const isSelected = currentEmoji === emoji;

              return (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    onEmojiChange(emoji);
                    onClose();
                  }}
                  className={`relative flex h-10 items-center justify-center rounded-lg text-xl transition ${
                    isSelected ? "bg-surface-hover" : "hover:bg-surface-hover"
                  }`}
                >
                  {emoji}

                  {isSelected && (
                    <Check
                      size={10}
                      className="absolute right-1 top-1 text-foreground"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* No search results */}
        {activeTab === "icons" && filteredIcons.length === 0 && (
          <div className="py-8 text-center text-xs text-foreground-muted">
            No icons found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectIconPicker;
