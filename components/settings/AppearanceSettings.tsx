"use client";

import { useState } from "react";
import {
  Desktop,
  Moon,
  PaintBrush,
  Sun,
} from "@phosphor-icons/react";

type Appearance = "system" | "light" | "dark";

const APPEARANCE_STORAGE_KEY = "workly-appearance";

const appearanceOptions = [
  {
    id: "system" as const,
    label: "System",
    description: "Use the appearance selected on your device.",
    icon: Desktop,
  },
  {
    id: "light" as const,
    label: "Light",
    description: "Use the light Workly interface.",
    icon: Sun,
  },
  {
    id: "dark" as const,
    label: "Dark",
    description: "Use the dark Workly interface.",
    icon: Moon,
  },
];

const AppearanceSettings = () => {
  const [appearance, setAppearance] = useState<Appearance>(() => {
    if (typeof window === "undefined") {
      return "system";
    }

    const storedAppearance = localStorage.getItem(
      APPEARANCE_STORAGE_KEY,
    );

    if (
      storedAppearance === "light" ||
      storedAppearance === "dark" ||
      storedAppearance === "system"
    ) {
      return storedAppearance;
    }

    return "system";
  });

  const handleAppearanceChange = (value: Appearance) => {
    setAppearance(value);

    localStorage.setItem(
      APPEARANCE_STORAGE_KEY,
      value,
    );
  };

  return (
    <section className="overflow-hidden rounded-xl border border-border">
      {/* Section header */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <PaintBrush
            size={16}
            weight="regular"
            className="text-foreground-muted"
          />

          <h2 className="text-xs font-medium text-foreground">
            Appearance
          </h2>
        </div>

        <p className="mt-1 text-[11px] text-foreground-muted">
          Choose how Workly should look.
        </p>
      </div>

      {/* Appearance options */}
      <div className="divide-y divide-border">
        {appearanceOptions.map((option) => {
          const Icon = option.icon;
          const selected = appearance === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleAppearanceChange(option.id)}
              className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors ${
                selected
                  ? "bg-surface"
                  : "hover:bg-surface-hover"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                  selected
                    ? "border-foreground/20 bg-background text-foreground"
                    : "border-border bg-background text-foreground-muted"
                }`}
              >
                <Icon
                  size={16}
                  weight={selected ? "regular" : "light"}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground">
                  {option.label}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-foreground-muted">
                  {option.description}
                </p>
              </div>

              {/* Selected indicator */}
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  selected
                    ? "border-foreground"
                    : "border-border"
                }`}
              >
                {selected && (
                  <div className="h-2 w-2 rounded-full bg-foreground" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AppearanceSettings;