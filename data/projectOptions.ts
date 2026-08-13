import {
  Circle,
  CircleCheck,
  CircleDot,
  CircleDashed,
} from "lucide-react";

import type {
  ProjectPriority,
  ProjectStatus,
} from "@/types/projects";

export const statusOptions: {
  value: ProjectStatus;
  label: string;
  icon: typeof Circle;
}[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleDashed,
  },
  {
    value: "planned",
    label: "Planned",
    icon: Circle,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: CircleDot,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheck,
  },
];

export const priorityOptions: {
  value: ProjectPriority;
  label: string;
}[] = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
];

export const leadOptions = [
  {
    value: "Daniel",
    label: "Daniel",
  },
];

export const targetDateOptions = [
  {
    value: "No date",
    label: "No date",
  },
  {
    value: "This week",
    label: "This week",
  },
  {
    value: "This month",
    label: "This month",
  },
  {
    value: "Next month",
    label: "Next month",
  },
];