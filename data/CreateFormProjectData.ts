import { ProjectIcon } from "@/types/projects";

type CreateProjectFormData = {
  name: string;
  description: string;
  status: string;
  priority: string;
  lead: string;
  targetDate: string;
  icon: ProjectIcon;
  emoji?: string;
  teamId: string;
};

export default CreateProjectFormData;