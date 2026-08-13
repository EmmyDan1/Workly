import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Camera,
  Code2,
  Database,
  File,
  Folder,
  FolderKanban,
  Globe2,
  Headphones,
  Heart,
  Layers3,
  Lightbulb,
  Megaphone,
  MessageCircle,
  Music,
  Palette,
  Rocket,
  Settings2,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ProjectIcon as ProjectIconType } from "@/types/projects";

type ProjectIconProps = {
  icon: ProjectIconType;
  size?: number;
  className?: string;
};

const iconMap: Record<ProjectIconType, LucideIcon> = {
  folder: Folder,
  kanban: FolderKanban,
  rocket: Rocket,
  briefcase: BriefcaseBusiness,
  layers: Layers3,
  sparkles: Sparkles,
  target: Target,
  code: Code2,
  globe: Globe2,
  chart: BarChart3,
  calendar: CalendarDays,
  users: Users,
  shopping: ShoppingBag,
  lightbulb: Lightbulb,
  heart: Heart,
  activity: Activity,
  zap: Zap,
  settings: Settings2,
  message: MessageCircle,
  database: Database,
  shield: Shield,
  star: Star,
  camera: Camera,
  music: Music,
  building: Building2,
  megaphone: Megaphone,
  palette: Palette,
  file: File,
  headphones: Headphones,
};

const ProjectIcon = ({
  icon,
  size = 16,
  className,
}: ProjectIconProps) => {
  const Icon = iconMap[icon] ?? FolderKanban;

  return <Icon size={size} className={className} />;
};
export default ProjectIcon;