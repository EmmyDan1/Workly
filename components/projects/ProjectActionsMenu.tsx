"use client";

import { useEffect, useRef } from "react";
import { Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";

import type { Project } from "@/types/projects";

type ProjectActionsMenuProps = {
  project: Project;
  position: {
    top: number;
    left: number;
  };
  onOpen: () => void;
  onCopyLink: () => void;
  onDelete: () => void;
  onEdit?: () => void;
  onClose: () => void;
};

const ProjectActionsMenu = ({
  project,
  onDelete,
  onOpen,
  onEdit,
  onCopyLink,
  position,
  onClose,
}: ProjectActionsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/projects/${project.id}`,
    );

    const closeEvent = new CustomEvent("close-project-menu");
    window.dispatchEvent(closeEvent);
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] w-52 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-2xl"
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.preventDefault()}
    >
      <button
        type="button"
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
        onClick={onOpen}
      >
        <ExternalLink size={14} className="text-foreground-muted" />
        Open project
      </button>

      <button
        type="button"
        disabled={!onEdit}
        onClick={onEdit}
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Pencil size={14} className="text-foreground-muted" />
        Edit project
      </button>

      <button
        type="button"
        onClick={onCopyLink}
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
      >
        <Copy size={14} className="text-foreground-muted" />
        Copy project link
      </button>

      <div className="my-1.5 border-t border-border" />

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-red-500 transition hover:bg-red-500/10"
      >
        <Trash2 size={14} />
        Delete project
      </button>
    </div>
  );
};

export default ProjectActionsMenu;
