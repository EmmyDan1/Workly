import { LucideIcon } from "lucide-react";

export type SearchResultType = "project" | "issue" | "document" | "team";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  updatedAt: string;
  icon: LucideIcon;
};
