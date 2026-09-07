"use client";

import { Gear } from "@phosphor-icons/react";
import SettingsSidebar  from "./SettingsSidebar";
import { SettingsSection } from "@/types/projects";

type SettingsLayoutProps = {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  children: React.ReactNode;
};

const SettingsLayout = ({
  activeSection,
  onSectionChange,
  children,
}: SettingsLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <Gear
            size={18}
            weight="regular"
            className="text-foreground-muted"
          />

          <h1 className="text-base font-semibold tracking-tight text-foreground">
            Settings
          </h1>
        </div>

        <p className="mt-1.5 text-xs text-foreground-muted">
          Manage your Workly account and application preferences.
        </p>
      </div>

      {/* Settings content */}
      <div className="flex flex-col gap-8 py-8 md:flex-row md:gap-12">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default SettingsLayout;