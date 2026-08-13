"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useIssue } from "@/components/providers/IssueProvider";
import { useMember } from "@/components/providers/MemberProvider";
import IssueProperties from "@/components/projects/issues/IssueProperties";
import { useProject } from "@/components/providers/ProjectProvider";
import { useActivity } from "@/components/providers/ActivityProvider";
import IssueActivity from "@/components/projects/issues/IssueActivity";
import { useComment } from "@/components/providers/CommentProvider";
import IssueComments from "@/components/projects/issues/IssueComments";
import EditIssueModal from "@/components/projects/issues/EditIssueModal";

export default function IssuePage() {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { getIssueActivities } = useActivity();
  const { addComment, updateComment, deleteComment, getIssueComments } =
    useComment();

  const { projects } = useProject();
  const { issues, deleteIssue } = useIssue();
  const { members } = useMember();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  const issueId = Array.isArray(params.issueId)
    ? params.issueId[0]
    : params.issueId;

  const issue = issues.find(
    (item) => item.id === issueId && item.projectId === projectId,
  );

  const project = projects.find((item) => item.id === projectId);

  const membersForProject = members.filter((member) =>
    project?.memberIds?.includes(member.id),
  );

  if (!issue) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="text-sm text-foreground-muted">Issue not found.</p>
      </div>
    );
  }

  const activities = getIssueActivities(issue.id);
  const comments = getIssueComments(issue.id);

  return (
    <main className="min-h-full">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => router.push(`/projects/${projectId}/issues`)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to issues
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setActionsOpen((current) => !current)}
              aria-label="Issue actions"
              aria-expanded={actionsOpen}
              className="rounded-md p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
            >
              <MoreHorizontal size={16} />
            </button>

            {actionsOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-44 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-xl shadow-black/10">
                <button
                  type="button"
                  onClick={() => {
                    setActionsOpen(false);
                    setEditOpen(true);
                  }}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
                >
                  Edit issue
                </button>

                <div className="my-1 border-t border-border" />

                <button
                  type="button"
                  onClick={() => {
                    setActionsOpen(false);
                    setDeleteOpen(true);
                  }}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs text-red-500 transition hover:bg-surface-hover"
                >
                  Delete issue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-5xl px-4 py-7 sm:px-6">
        {/* Title */}
        <section>
          <p className="text-[11px] font-medium uppercase tracking-wide text-foreground-muted">
            Issue
          </p>

          <h1 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {issue.title}
          </h1>

          {issue.description && (
            <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-foreground-muted">
              {issue.description}
            </p>
          )}
        </section>

        {/* Properties */}
        <IssueProperties issue={issue} projectMembers={membersForProject} />
        <IssueActivity activities={activities} members={membersForProject} />

        {/* Comments */}
        <IssueComments
          issueId={issue.id}
          comments={comments}
          members={membersForProject}
          onAddComment={addComment}
          onUpdateComment={updateComment}
          onDeleteComment={deleteComment}
        />
      </div>
      {deleteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-5 shadow-2xl">
            <h2 className="text-sm font-semibold text-foreground">
              Delete issue?
            </h2>

            <p className="mt-2 text-xs leading-5 text-foreground-muted">
              This will permanently delete{" "}
              <span className="font-medium text-foreground">
                "{issue.title}"
              </span>
              . This action cannot be undone.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  deleteIssue(issue.id);
                  setDeleteOpen(false);
                  router.push(`/projects/${issue.projectId}`);
                }}
                className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600"
              >
                Delete issue
              </button>
            </div>
          </div>
        </div>
      )}

      {editOpen && (
        <EditIssueModal
          issue={issue}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </main>
  );
}
