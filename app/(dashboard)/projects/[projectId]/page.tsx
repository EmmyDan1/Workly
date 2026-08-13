"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderKanban, Plus } from "lucide-react";

import ProjectOverview from "@/components/projects/ProjectOverview";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { useProject } from "@/components/providers/ProjectProvider";
import Button from "@/components/ui/Button";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();

  const {
    projects,
    openCreateProjectModal,
    isCreateProjectOpen,
  } = useProject();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  const project = projects.find(
    (project) => project.id === projectId
  );

  /*
   * Project does not exist
   */
  if (!project) {
    return (
      <>
        <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface">
              <FolderKanban
                size={24}
                className="text-foreground-muted"
              />
            </div>

            <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
              Project not found
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-foreground-muted">
              We couldn't find the project you're looking for. It may
              have been deleted, moved, or the link may be incorrect.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push("/projects")}
              >
                <ArrowLeft size={15} />
                Back to projects
              </Button>

              <Button
                type="button"
                onClick={openCreateProjectModal}
              >
                <Plus size={15} />
                New project
              </Button>
            </div>
          </div>
        </div>

        {isCreateProjectOpen && <CreateProjectModal />}
      </>
    );
  }

  /*
   * Project exists
   */
  return <ProjectOverview project={project} />;
}