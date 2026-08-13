import type { Project } from "@/types/projects";
import ProjectItem from "./ProjectItem";

type ProjectListProps = {
  projects: Project[];
};

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="flex flex-col rounded-xl bg-background">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;