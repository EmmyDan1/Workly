import { Tab } from "@/types/navigation";
import { LucideIcon, PlusIcon } from "lucide-react";

export type HeaderAction =
  | "create-project"
  | "create-issue"
  | "create-team"
  | "create-document";

export type PageConfig = {
  title: string;
  mode: "title" | "search";
  tabs: Tab[];
  headerAction?: {
    icon: LucideIcon;
    action: HeaderAction;
    label: string;
  };
};
export const pageConfig: Record<string, PageConfig> = {
  "/dashboard": {
    title: "Dashboard",
    mode: "title",
    tabs: [],
  },

  "/projects": {
    title: "Projects",
    mode: "title",
    tabs: [],
    headerAction: {
      icon: PlusIcon,
      action: "create-project",
      label: "New Project",
    },
  },

  "/search": {
    title: "",
    mode: "search",
    tabs: [
      { id: "all", label: "All" },
      { id: "issues", label: "Issues" },
      { id: "projects", label: "Projects" },
      { id: "documents", label: "Documents" },
    ],
  },

  "/teams": {
    title: "Teams",
    mode: "title",
    tabs: [
      { id: "members", label: "Members" },
      { id: "projects", label: "Projects" },
    ],
  },

  "/settings": {
    title: "Settings",
    mode: "title",
    tabs: [],
  },
};
