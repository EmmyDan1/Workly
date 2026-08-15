"use client";

import { AlertTriangle, X } from "lucide-react";

import Button from "../../ui/Button";

type DeleteTeamDialogProps = {
  teamName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteTeamDialog = ({
  teamName,
  onConfirm,
  onCancel,
}: DeleteTeamDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-team-title"
        className="w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-4 px-6 py-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <AlertTriangle size={19} />
          </div>

          <div className="min-w-0">
            <h2
              id="delete-team-title"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              Delete team?
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-foreground-muted">
              This will permanently delete{" "}
              <span className="font-medium text-foreground">
                {teamName}
              </span>
              . This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close dialog"
            className="ml-auto rounded-lg p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex justify-end gap-2 border-t border-border bg-surface/40 px-6 py-4">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="button" onClick={onConfirm}>
            Delete team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeamDialog;