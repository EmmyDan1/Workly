"use client";

import { useIssue } from "@/components/providers/IssueProvider";

type ProjectIssueCountProps = {
  projectId: string;
};

const ProjectIssueCount = ({
  projectId,
}: ProjectIssueCountProps) => {
  const { issues, getProjectIssues } = useIssue();

  const projectIssues = getProjectIssues(projectId);

  console.log("PROJECT ID:", projectId);
  console.log("ALL ISSUES:", issues);
  console.log("PROJECT ISSUES:", projectIssues);

  return <span>{projectIssues.length}</span>;
};

export default ProjectIssueCount;