"use client";
import { Circle, CircleCheck, CircleDot, CircleX } from "lucide-react";
import { useIssue } from "@/components/providers/IssueProvider";
import type { Issue } from "@/types/projects";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import ProjectIssueActionsMenu from "./ProjectIssueActionsMenu";
import DeleteIssueDialog from "./DeleteIssueDialog";
import EditIssueModal from "./EditIssueModal";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useMember } from "@/components/providers/MemberProvider";
import { useRouter } from "next/navigation";
type ProjectIssueItemProps = {
  issue: Issue;
};

const statusIcons = {
  backlog: Circle,
  todo: CircleDot,
  "in-progress": CircleDot,
  done: CircleCheck,
  canceled: CircleX,
};

const priorityStyles = {
  "no-priority": "text-foreground-muted",
  low: "text-foreground-muted",
  medium: "text-amber-500",
  high: "text-orange-500",
  urgent: "text-red-500",
};

const ProjectIssueItem = ({ issue }: ProjectIssueItemProps) => {
  const { members } = useMember();
  const router = useRouter();
  const assignee = members.find((member) => member.id === issue.assigneeId);
  const StatusIcon = statusIcons[issue.status];
  const [actionsOpen, setActionsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const { deleteIssue } = useIssue();
  const { notify } = useNotification();

  return (
    <div className="group flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-hover sm:px-6">
      {/* Status */}
      <button
        type="button"
        aria-label={`Change status of ${issue.title}`}
        className="shrink-0 rounded-md p-1 text-foreground-muted transition hover:bg-surface"
      >
        <StatusIcon size={16} />
      </button>

      <button
        type="button"
        onClick={() =>
          router.push(`/projects/${issue.projectId}/issues/${issue.id}`)
        }
        className="min-w-0 flex-1 text-left"
      >
        <div className="min-w-0">
          <h3 className="truncate text-xs font-medium text-foreground sm:text-[13px]">
            {issue.title}
          </h3>

          {issue.description && (
            <p className="mt-0.5 truncate text-[11px] text-foreground-muted">
              {issue.description}
            </p>
          )}
        </div>
      </button>
      {/* Priority */}
      <span
        className={`hidden shrink-0 text-[11px] capitalize sm:block ${
          priorityStyles[issue.priority]
        }`}
      >
        {issue.priority.replace("-", " ")}
      </span>

      {/* Assignee */}
      {assignee && (
        <div
          className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background sm:flex"
          title={assignee.name}
        >
          {assignee.name.charAt(0).toUpperCase()}
        </div>
      )}
      {/* Actions */}
      <div
        className="relative shrink-0"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label={`More options for ${issue.title}`}
          aria-expanded={actionsOpen}
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();

            setMenuPosition({
              top: rect.bottom + 6,
              left: Math.max(8, rect.right - 192),
            });

            setActionsOpen((open) => !open);
          }}
          className={`rounded-md p-1.5 text-foreground-muted transition hover:bg-surface hover:text-foreground ${
            actionsOpen
              ? "bg-surface text-foreground"
              : "opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          }`}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
      {actionsOpen && (
        <ProjectIssueActionsMenu
          issue={issue}
          position={menuPosition}
          onEdit={() => {
            setEditOpen(true);
            setActionsOpen(false);
            // Edit will be connected next
          }}
          onCopyLink={async () => {
            await navigator.clipboard.writeText(
              `${window.location.origin}/projects/${issue.projectId}/issues/${issue.id}`,
            );
            notify.success("Issue link copied");
            setActionsOpen(false);
          }}
          onDelete={() => {
            setActionsOpen(false);
            setDeleteOpen(true);
          }}
          onClose={() => setActionsOpen(false)}
        />
      )}
      {deleteOpen && (
        <DeleteIssueDialog
          issueTitle={issue.title}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={() => {
            deleteIssue(issue.id);
            notify.success("Issue deleted successfully");
            setDeleteOpen(false);
          }}
        />
      )}
      {editOpen && (
        <EditIssueModal
          key={issue.id}
          issue={issue}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectIssueItem;
