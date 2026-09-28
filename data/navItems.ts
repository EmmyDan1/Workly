import { House, FolderKanban, UsersRound, Settings2 } from "lucide-react";
import { NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  {
    title: "Workspace",
    route: "/dashboard",
    icon: House,
  },
  {
    title: "Projects",
    route: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Teams",
    route: "/teams",
    icon: UsersRound,
  },
  {
    title: "Settings",
    route: "/settings",
    icon: Settings2,
  },
];
