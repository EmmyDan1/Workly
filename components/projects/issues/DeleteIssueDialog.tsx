"use client";

import { AlertTriangle, X } from "lucide-react";

type DeleteIssueDialogProps = {
  issueTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteIssueDialog = ({
  issueTitle,
  onCancel,
  onConfirm,
}: DeleteIssueDialogProps) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
            <AlertTriangle
              size={17}
              className="text-red-500"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Delete issue?
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-foreground-muted">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{issueTitle}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="rounded-md p-1 text-foreground-muted transition hover:bg-surface hover:text-foreground"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600"
          >
            Delete issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteIssueDialog;