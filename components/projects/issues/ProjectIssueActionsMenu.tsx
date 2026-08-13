"use client";

import { useEffect, useRef } from "react";
import { Copy, Pencil, Trash2 } from "lucide-react";

import type { Issue } from "@/types/projects";

type ProjectIssueActionsMenuProps = {
  issue: Issue;
  onEdit: () => void;
  onCopyLink: () => void;
  onDelete: () => void;
  onClose: () => void;
  position: {
    top: number;
    left: number;
  };
};

const ProjectIssueActionsMenu = ({
  issue,
  onEdit,
  onCopyLink,
  onDelete,
  onClose,
  position,
}: ProjectIssueActionsMenuProps) => {
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

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] w-48 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-2xl"
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.preventDefault()}
    >
      {/* Edit */}
      <button
        type="button"
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
      >
        <Pencil size={14} className="text-foreground-muted" />
        Edit issue
      </button>

      {/* Copy link */}
      <button
        type="button"
        onClick={() => {
          onCopyLink();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
      >
        <Copy size={14} className="text-foreground-muted" />
        Copy issue link
      </button>

      <div className="my-1.5 border-t border-border" />

      {/* Delete */}
      <button
        type="button"
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-red-500 transition hover:bg-red-500/10"
      >
        <Trash2 size={14} />
        Delete issue
      </button>
    </div>
  );
};

export default ProjectIssueActionsMenu;
