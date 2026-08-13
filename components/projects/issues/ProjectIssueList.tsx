"use client";

import type { Issue } from "@/types/projects";
import ProjectIssueItem from "./ProjectIssueItem";

type ProjectIssueListProps = {
  issues: Issue[];
};

const ProjectIssueList = ({
  issues,
}: ProjectIssueListProps) => {
  return (
    <div className="divide-y divide-border border-y border-border">
      {issues.map((issue) => (
        <ProjectIssueItem
          key={issue.id}
          issue={issue}
        />
      ))}
    </div>
  );
};

export default ProjectIssueList;