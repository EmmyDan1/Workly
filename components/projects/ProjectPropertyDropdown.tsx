"use client";

import { Check, ChevronDown } from "lucide-react";

type ProjectPropertyDropdownProps = {
  label: string;
  icon?: React.ReactNode;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function ProjectPropertyDropdown({
  label,
  icon,
  open,
  onClick,
  children,
}: ProjectPropertyDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition ${
          open
            ? "border-foreground-muted bg-surface-hover text-foreground"
            : "border-border bg-surface text-foreground-muted hover:border-foreground-muted hover:bg-surface-hover hover:text-foreground"
        }`}
      >
        {icon}

        <span>{label}</span>

        <ChevronDown
          size={12}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-48 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-xl shadow-black/10">
          {children}
        </div>
      )}
    </div>
  );
}

export function ProjectPropertyOption({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-surface-hover"
    >
      {children}

      {active && (
        <Check
          size={14}
          className="shrink-0 text-foreground"
        />
      )}
    </button>
  );
}