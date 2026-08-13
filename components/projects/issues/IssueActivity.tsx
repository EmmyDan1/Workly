"use client";

import type {
  IssueActivity as IssueActivityRecord,
  ProjectMember,
} from "@/types/projects";

type IssueActivityProps = {
  activities: IssueActivityRecord[];
  members: ProjectMember[];
};

const formatActivityType = (
  activity: IssueActivityRecord,
  members: ProjectMember[],
) => {
  const actor = members.find((member) => member.id === activity.actorId);

  const actorName = actor?.name ?? "Someone";

switch (activity.type) {
  case "created":
    return `${actorName} created this issue`;

  case "status_changed":
    return `${actorName} changed status`;

  case "priority_changed":
    return `${actorName} changed priority`;

  case "assignee_changed":
    return `${actorName} changed assignee`;

  case "title_changed":
    return `${actorName} changed the title`;

  case "description_changed":
    return `${actorName} changed the description`;

  case "comment_added":
    return `${actorName} added a comment`;

  default:
    return `${actorName} updated this issue`;
}
};

const formatValue = (value: string | undefined) => {
  if (!value) {
    return "None";
  }

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const formatActivityTime = (date: string) => {
  const timestamp = new Date(date).getTime();
  const now = Date.now();
  const difference = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (difference < minute) {
    return "Just now";
  }

  if (difference < hour) {
    return `${Math.floor(difference / minute)}m ago`;
  }

  if (difference < day) {
    return `${Math.floor(difference / hour)}h ago`;
  }

  if (difference < 7 * day) {
    return `${Math.floor(difference / day)}d ago`;
  }

  return new Date(date).toLocaleDateString();
};

const IssueActivity = ({ activities, members }: IssueActivityProps) => {
  if (activities.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-foreground">Activity</h2>

        <p className="mt-4 text-xs text-foreground-muted">No activity yet.</p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold text-foreground">Activity</h2>

      <div className="mt-5 space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-medium text-foreground-muted">
              {members
                .find((member) => member.id === activity.actorId)
                ?.name.charAt(0)
                .toUpperCase() ?? "?"}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground">
                {formatActivityType(activity, members)}
              </p>

              {(activity.fromValue || activity.toValue) && (
                <p className="mt-1 text-xs text-foreground-muted">
                  {formatValue(activity.fromValue)}{" "}
                  <span className="mx-1">→</span>{" "}
                  {formatValue(activity.toValue)}
                </p>
              )}

              <p className="mt-1 text-[11px] text-foreground-muted">
                {formatActivityTime(activity.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IssueActivity;
