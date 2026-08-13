"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";

import { useIssue } from "@/components/providers/IssueProvider";
import ProjectIssueList from "@/components/projects/issues/ProjectIssueList";
import CreateIssueModal from "@/components/projects/issues/CreateIssueModal";

const ProjectIssuesPage = () => {
  const [createIssueOpen, setCreateIssueOpen] = useState(false);
  const params = useParams<{ projectId: string }>();

  console.log("PARAMS:", params);

  const projectId = params.projectId;
  console.log("ISSUES PAGE PROJECT ID:", projectId);

  const { getProjectIssues } = useIssue();

  const issues = getProjectIssues(projectId);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-sm font-semibold text-foreground">Issues</h1>

          <p className="mt-0.5 text-xs text-foreground-muted">
            {issues.length} {issues.length === 1 ? "issue" : "issues"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreateIssueOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition hover:opacity-90"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">New issue</span>
        </button>
      </div>

      {/* Empty state */}
      {issues.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-sm text-center">
            <h2 className="text-sm font-medium text-foreground">
              No issues yet
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-foreground-muted">
              Create an issue to start tracking work for this project.
            </p>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
            >
              <Plus size={14} />
              New issue
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <ProjectIssueList issues={issues} />
        </div>
      )}
      <CreateIssueModal
        projectId={projectId}
        open={createIssueOpen}
        onClose={() => setCreateIssueOpen(false)}
      />
    </div>
  );
};

export default ProjectIssuesPage;
