"use client";

import { useState } from "react";

import SettingsLayout from "@/components/settings/SettingsLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

import { SettingsSection } from "@/types/projects";

const SettingsPage = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  return (
    <SettingsLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {activeSection === "profile" && <ProfileSettings />}

      {activeSection === "preferences" && <PreferencesSettings />}

      {activeSection === "notifications" && <NotificationSettings />}

      {activeSection === "appearance" && <AppearanceSettings />}
    </SettingsLayout>
  );
};

export default SettingsPage;