import {
  Bell,
  Gear,
  PaintBrush,
  SlidersHorizontal,
  User,
} from "@phosphor-icons/react";

export const settingsItems = [
  {
    id: "profile" as const,
    label: "Profile",
    description: "Your personal information",
    icon: User,
  },
  {
    id: "preferences" as const,
    label: "Preferences",
    description: "Customize how Workly behaves",
    icon: SlidersHorizontal,
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    description: "Manage your notifications",
    icon: Bell,
  },
  {
    id: "appearance" as const,
    label: "Appearance",
    description: "Customize the look and feel",
    icon: PaintBrush,
  },
];
