import { LucideIcon } from "lucide-react";
export type Tab = {
  id: string;
  label: string;
};

export type NavItem = {
  title: string;
  route: string;
  icon: LucideIcon;
};
