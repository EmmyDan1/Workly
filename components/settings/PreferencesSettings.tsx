"use client";

import { useState } from "react";
import { SlidersHorizontal } from "@phosphor-icons/react";

const PreferencesSettings = () => {
  const [openProjectsByDefault, setOpenProjectsByDefault] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return localStorage.getItem("workly-open-projects") !== "false";
  });

  const [compactInterface, setCompactInterface] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("workly-compact-interface") === "true";
  });

  const toggleOpenProjects = () => {
    const nextValue = !openProjectsByDefault;

    setOpenProjectsByDefault(nextValue);

    localStorage.setItem(
      "workly-open-projects",
      String(nextValue),
    );
  };

  const toggleCompactInterface = () => {
    const nextValue = !compactInterface;

    setCompactInterface(nextValue);

    localStorage.setItem(
      "workly-compact-interface",
      String(nextValue),
    );
  };

  return (
    <section className="overflow-hidden rounded-xl border border-border">
      {/* Section header */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            weight="regular"
            className="text-foreground-muted"
          />

          <h2 className="text-xs font-medium text-foreground">
            Application preferences
          </h2>
        </div>

        <p className="mt-1 text-[11px] text-foreground-muted">
          Control how Workly behaves while you use it.
        </p>
      </div>

      {/* Preferences */}
      <div className="divide-y divide-border">
        {/* Open projects */}
        <div className="flex min-h-[72px] items-center justify-between gap-8 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground">
              Open projects by default
            </p>

            <p className="mt-1 text-[11px] leading-5 text-foreground-muted">
              Open your projects view when Workly starts.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={openProjectsByDefault}
            aria-label="Open projects by default"
            onClick={toggleOpenProjects}
            className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
              openProjectsByDefault
                ? "bg-foreground"
                : "bg-surface-hover"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform duration-150 ${
                openProjectsByDefault
                  ? "translate-x-4"
                  : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Compact interface */}
        <div className="flex min-h-[72px] items-center justify-between gap-8 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground">
              Compact interface
            </p>

            <p className="mt-1 text-[11px] leading-5 text-foreground-muted">
              Use tighter spacing throughout the application.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={compactInterface}
            aria-label="Compact interface"
            onClick={toggleCompactInterface}
            className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
              compactInterface
                ? "bg-foreground"
                : "bg-surface-hover"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform duration-150 ${
                compactInterface
                  ? "translate-x-4"
                  : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PreferencesSettings;