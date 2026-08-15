export type ProjectStatus =
  | "backlog"
  | "planned"
  | "in-progress"
  | "completed"
  | "canceled";

export type ProjectHealth = "on-track" | "at-risk" | "off-track";

export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export type ProjectIcon =
  | "folder"
  | "kanban"
  | "rocket"
  | "briefcase"
  | "layers"
  | "sparkles"
  | "target"
  | "code"
  | "globe"
  | "chart"
  | "calendar"
  | "users"
  | "shopping"
  | "lightbulb"
  | "heart"
  | "activity"
  | "zap"
  | "settings"
  | "message"
  | "database"
  | "shield"
  | "star"
  | "camera"
  | "music"
  | "building"
  | "megaphone"
  | "palette"
  | "file"
  | "headphones";

export type ProjectResource = {
  id: string;
  projectId: string;
  title: string;
  type: "document" | "link";
  url: string;
  createdAt: string;
};

export type ProjectMilestone = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  targetDate?: string;
  completed: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;

  status: ProjectStatus;
  health: ProjectHealth;
  priority: ProjectPriority;

  teamId?: string;

  lead: string;
  members: number;
  memberIds?: string[];

  targetDate: string;

  updatedAt: string;

  icon: ProjectIcon;
  emoji?: string;
};

export type IssueStatus =
  | "backlog"
  | "todo"
  | "in-progress"
  | "done"
  | "canceled";

export type IssuePriority =
  | "no-priority"
  | "low"
  | "medium"
  | "high"
  | "urgent";

export type Issue = {
  id: string;
  projectId: string;

  title: string;
  description?: string;

  status: IssueStatus;
  priority: IssuePriority;

  assigneeId?: string;

  createdAt: string;
  updatedAt: string;
};

export type ProjectMember = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Team = {
  id: string;
  name: string;
  description?: string;
  memberIds: string[];
  createdAt: string;
};

export type IssueActivityType =
  | "created"
  | "status_changed"
  | "priority_changed"
  | "assignee_changed"
  | "title_changed"
  | "description_changed"
  | "comment_added";
export type IssueActivity = {
  id: string;
  issueId: string;
  actorId: string;

  type: IssueActivityType;

  fromValue?: string;
  toValue?: string;

  createdAt: string;
};

export type IssueComment = {
  id: string;
  issueId: string;

  authorId: string;

  body: string;

  createdAt: string;
  updatedAt: string;
};
