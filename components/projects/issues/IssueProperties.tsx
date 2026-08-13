"use client";

import { useIssue } from "@/components/providers/IssueProvider";
import type { Issue, ProjectMember } from "@/types/projects";
import { formatRelativeDate } from "@/utils/formatDate";

type IssuePropertiesProps = {
  issue: Issue;
  projectMembers: ProjectMember[];
};

const IssueProperties = ({ issue, projectMembers }: IssuePropertiesProps) => {
  const { updateIssue } = useIssue();

  const assignee = projectMembers.find(
    (member) => member.id === issue.assigneeId,
  );
  return (
    <section className="mt-8 border-y border-border py-5">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {/* Status */}
        <div>
          <select
            value={issue.status}
            onChange={(event) =>
              updateIssue(issue.id, {
                status: event.target.value as Issue["status"],
                updatedAt: "Just now",
              })
            }
            className="mt-1.5 h-8 rounded-md border border-border bg-surface px-2 text-xs font-medium text-foreground outline-none transition hover:bg-surface-hover focus:border-foreground-muted"
          >
            <option value="backlog">Backlog</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <select
            value={issue.priority}
            onChange={(event) =>
              updateIssue(issue.id, {
                priority: event.target.value as Issue["priority"],
                updatedAt: "Just now",
              })
            }
            className="mt-1.5 h-8 rounded-md border border-border bg-surface px-2 text-xs font-medium text-foreground outline-none transition hover:bg-surface-hover focus:border-foreground-muted"
          >
            <option value="no-priority">No priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Assignee */}
        <div>
          <select
            value={issue.assigneeId ?? ""}
            onChange={(event) =>
              updateIssue(issue.id, {
                assigneeId: event.target.value || undefined,
                updatedAt: "Just now",
              })
            }
            className="mt-1.5 h-8 min-w-32 rounded-md border border-border bg-surface px-2 text-xs font-medium text-foreground outline-none transition hover:bg-surface-hover focus:border-foreground-muted"
          >
            <option value="">Unassigned</option>

            {projectMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Updated */}
        <div>
          <p className="text-[11px] font-medium text-foreground-muted">
            Updated
          </p>
          <p className="mt-1.5 text-xs font-medium text-foreground">
            {formatRelativeDate(issue.updatedAt)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IssueProperties;
