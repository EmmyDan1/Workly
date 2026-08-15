"use client";
import { useState } from "react";
import AddResourceModal from "@/components/projects/resources/AddResourceModal";
import type { Project } from "@/types/projects";
import ProjectIdentity from "./ProjectIdentity";
import ProjectProperties from "./ProjectProperties";
import { useRouter } from "next/navigation";
import { useTeam } from "@/components/providers/TeamProvider";
import { useProject } from "@/components/providers/ProjectProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import ProjectDescription from "./projectDescription/ProjectDescription";
import ProjectResourceList from "@/components/projects/resources/ProjectResourceList";
import AddMilestoneModal from "@/components/projects/milestones/AddMilestoneModal";
import ProjectMilestoneList from "@/components/projects/milestones/ProjectMilestoneList";

type ProjectOverviewProps = {
  project: Project;
};

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const [resourceType, setResourceType] = useState<"document" | "link" | null>(
    null,
  );
  const { updateProject } = useProject();
  const { notify } = useNotification();

  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(project.description);
  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);

  const handleSaveDescription = () => {
    updateProject(project.id, {
      description: description.trim(),
    });

    setEditingDescription(false);
    notify.success("Description updated");
  };
  const router = useRouter();
  const { getTeam } = useTeam();

  const team = project.teamId ? getTeam(project.teamId) : undefined;
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Project identity */}
      <ProjectIdentity project={project} />
      {team && (
        <div className="border-b border-border py-4">
          <button
            type="button"
            onClick={() => router.push(`/teams/${team.id}`)}
            className="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 -ml-2 transition hover:bg-surface-hover"
          >
            <span className="text-xs text-foreground-muted">Team</span>

            <span className="text-xs font-medium text-foreground">
              {team.name}
            </span>
          </button>
        </div>
      )}

      <ProjectProperties project={project} />

      {/* Resources */}
      <section className="border-b border-border py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Resources</h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setResourceType("document")}
              className="rounded-md px-2.5 py-1.5 text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
            >
              + Add document
            </button>

            <button
              type="button"
              onClick={() => setResourceType("link")}
              className="rounded-md px-2.5 py-1.5 text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
            >
              + Add link
            </button>
          </div>
        </div>
        <ProjectResourceList projectId={project.id} />
      </section>

      {/* Description */}
      <ProjectDescription
        project={project}
        editingDescription={editingDescription}
        description={description}
        setEditingDescription={setEditingDescription}
        setDescription={setDescription}
        onSave={handleSaveDescription}
      />

      {/* Milestones */}
      <section className="py-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Milestones
            </h2>

            <p className="mt-1 text-xs text-foreground-muted">
              Break this project into meaningful deliverables.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMilestoneModalOpen(true)}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-hover"
          >
            + Add milestone
          </button>
        </div>
        <ProjectMilestoneList projectId={project.id} />
      </section>
      {resourceType && (
        <AddResourceModal
          projectId={project.id}
          type={resourceType}
          onClose={() => setResourceType(null)}
        />
      )}
      {milestoneModalOpen && (
        <AddMilestoneModal
          projectId={project.id}
          onClose={() => setMilestoneModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectOverview;
