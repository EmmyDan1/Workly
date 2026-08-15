import {
  ActivityIcon,
  ChartBarIcon,
  BriefcaseIcon,
  BuildingsIcon,
  CalendarIcon,
  CameraIcon,
  CodeIcon,
  DatabaseIcon,
  FileIcon,
  FolderIcon,
  KanbanIcon,
  GlobeIcon,
  HeadphonesIcon,
  HeartIcon,
  StackIcon,
  LightbulbIcon,
  MegaphoneIcon,
  ChatCircleIcon,
  MusicNotesIcon,
  PaletteIcon,
  RocketLaunchIcon,
  GearIcon,
  ShieldIcon,
  ShoppingBagIcon,
  SparkleIcon,
  StarIcon,
  TargetIcon,
  UsersThreeIcon,
  LightningIcon,
} from "@phosphor-icons/react";

import type { Icon } from "@phosphor-icons/react";
import type { ProjectIcon as ProjectIconType } from "@/types/projects";

type ProjectIconProps = {
  icon: ProjectIconType;
  size?: number;
  className?: string;
};

const iconMap: Record<ProjectIconType, Icon> = {
  folder: FolderIcon,
  kanban: KanbanIcon,
  rocket: RocketLaunchIcon,
  briefcase: BriefcaseIcon,
  layers: StackIcon,
  sparkles: SparkleIcon,
  target: TargetIcon,
  code: CodeIcon,
  globe: GlobeIcon,
  chart: ChartBarIcon,
  calendar: CalendarIcon,
  users: UsersThreeIcon,
  shopping: ShoppingBagIcon,
  lightbulb: LightbulbIcon,
  heart: HeartIcon,
  activity: ActivityIcon,
  zap: LightningIcon,
  settings: GearIcon,
  message: ChatCircleIcon,
  database: DatabaseIcon,
  shield: ShieldIcon,
  star: StarIcon,
  camera: CameraIcon,
  music: MusicNotesIcon,
  building: BuildingsIcon,
  megaphone: MegaphoneIcon,
  palette: PaletteIcon,
  file: FileIcon,
  headphones: HeadphonesIcon,
};

const ProjectIcon = ({ icon, size = 16, className }: ProjectIconProps) => {
  const IconComponent = iconMap[icon] ?? KanbanIcon;

  return <IconComponent size={size} weight="regular" className={className} />;
};

export default ProjectIcon;
