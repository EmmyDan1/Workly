"use client";
import { useState } from "react";
import { ExternalLink, FileText, Link2, MoreHorizontal } from "lucide-react";
import { useProjectResource } from "@/components/providers/ProjectResourceProvider";
import { ProjectResource } from "@/types/projects";
import DeleteResourceDialog from "./DeleteResourceDialog";
import { useNotification } from "@/components/providers/NotificationProvider";

type ProjectResourceListProps = {
  projectId: string;
};

const ProjectResourceList = ({ projectId }: ProjectResourceListProps) => {
  const { getProjectResources, deleteResource } = useProjectResource();
  const { notify } = useNotification();
  const resources = getProjectResources(projectId);
  const [resourceToDelete, setResourceToDelete] =
    useState<ProjectResource | null>(null);

  if (resources.length === 0) {
    return (
      <div className="mt-5 rounded-lg border border-dashed border-border px-5 py-8 text-center">
        <p className="text-sm text-foreground-muted">No resources added yet.</p>

        <p className="mt-1 text-xs text-foreground-muted">
          Add documents or links related to this project.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 divide-y divide-border rounded-lg border border-border">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="group flex items-center gap-3 px-4 py-3"
        >
          {/* Icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
            {resource.type === "document" ? (
              <FileText size={15} className="text-foreground-muted" />
            ) : (
              <Link2 size={15} className="text-foreground-muted" />
            )}
          </div>

          {/* Resource info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              {resource.title}
            </p>

            <p className="mt-0.5 truncate text-[11px] text-foreground-muted">
              {resource.url}
            </p>
          </div>

          {/* Open */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            aria-label={`Open ${resource.title}`}
            className="rounded-md p-1.5 text-foreground-muted opacity-0 transition hover:bg-surface-hover hover:text-foreground group-hover:opacity-100"
          >
            <ExternalLink size={15} />
          </a>

          {/* Delete */}
          <button
            type="button"
            onClick={() => setResourceToDelete(resource)}
            aria-label={`Delete ${resource.title}`}
            className="rounded-md p-1.5 text-foreground-muted opacity-0 transition hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      ))}
      {resourceToDelete && (
        <DeleteResourceDialog
          resourceName={resourceToDelete.title}
          onCancel={() => setResourceToDelete(null)}
          onConfirm={() => {
            deleteResource(resourceToDelete.id);
            setResourceToDelete(null);

            notify.success("Resource deleted successfully.");
          }}
        />
      )}
    </div>
  );
};

export default ProjectResourceList;
