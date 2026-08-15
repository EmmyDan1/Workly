"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { useProjectResource } from "@/components/providers/ProjectResourceProvider";
import type { ProjectResource } from "@/types/projects";

type AddResourceModalProps = {
  projectId: string;
  type: "document" | "link";
  onClose: () => void;
};

const AddResourceModal = ({
  projectId,
  type,
  onClose,
}: AddResourceModalProps) => {
  const { addResource } = useProjectResource();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Give this resource a name.");
      return;
    }

    if (!url.trim()) {
      setError(
        type === "document"
          ? "Add a document link."
          : "Add a valid link.",
      );
      return;
    }

    const resource: ProjectResource = {
      id: crypto.randomUUID(),
      projectId,
      title: title.trim(),
      type,
      url: url.trim(),
      createdAt: new Date().toISOString(),
    };

    addResource(resource);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-4 px-6 py-6">
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Add {type === "document" ? "document" : "link"}
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-foreground-muted">
              Add a resource to this project.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="ml-auto rounded-lg p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 pb-6">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Name
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError("");
                }}
                placeholder={
                  type === "document"
                    ? "Project brief"
                    : "Design documentation"
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                {type === "document" ? "Document URL" : "URL"}
              </label>

              <input
                type="url"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setError("");
                }}
                placeholder="https://..."
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t border-border bg-surface/40 px-6 py-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Add {type === "document" ? "document" : "link"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;