"use client";

import { useState } from "react";
import { Bell } from "@phosphor-icons/react";

type NotificationPreferences = {
  projectUpdates: boolean;
  teamActivity: boolean;
  comments: boolean;
};

const DEFAULT_PREFERENCES: NotificationPreferences = {
  projectUpdates: true,
  teamActivity: true,
  comments: true,
};

const NOTIFICATION_STORAGE_KEY = "workly-notification-preferences";

const NotificationSettings = () => {
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(() => {
      if (typeof window === "undefined") {
        return DEFAULT_PREFERENCES;
      }

      try {
        const storedPreferences = localStorage.getItem(
          NOTIFICATION_STORAGE_KEY,
        );

        if (!storedPreferences) {
          return DEFAULT_PREFERENCES;
        }

        return {
          ...DEFAULT_PREFERENCES,
          ...JSON.parse(storedPreferences),
        };
      } catch {
        return DEFAULT_PREFERENCES;
      }
    });

  const updatePreference = (
    preference: keyof NotificationPreferences,
  ) => {
    setPreferences((currentPreferences) => {
      const nextPreferences = {
        ...currentPreferences,
        [preference]: !currentPreferences[preference],
      };

      localStorage.setItem(
        NOTIFICATION_STORAGE_KEY,
        JSON.stringify(nextPreferences),
      );

      return nextPreferences;
    });
  };

  const notificationItems = [
    {
      id: "projectUpdates" as const,
      title: "Project updates",
      description:
        "Receive notifications about project activity and changes.",
    },
    {
      id: "teamActivity" as const,
      title: "Team activity",
      description:
        "Get notified when team members are added or removed.",
    },
    {
      id: "comments" as const,
      title: "Comments",
      description:
        "Receive notifications when someone comments on your work.",
    },
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-border">
      {/* Section header */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Bell
            size={16}
            weight="regular"
            className="text-foreground-muted"
          />

          <h2 className="text-xs font-medium text-foreground">
            Notification preferences
          </h2>
        </div>

        <p className="mt-1 text-[11px] text-foreground-muted">
          Choose which activity should notify you.
        </p>
      </div>

      {/* Notification preferences */}
      <div className="divide-y divide-border">
        {notificationItems.map((item) => {
          const enabled = preferences[item.id];

          return (
            <div
              key={item.id}
              className="flex min-h-[72px] items-center justify-between gap-8 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">
                  {item.title}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-foreground-muted">
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label={`${enabled ? "Disable" : "Enable"} ${item.title} notifications`}
                onClick={() => updatePreference(item.id)}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                  enabled
                    ? "bg-foreground"
                    : "bg-surface-hover"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform duration-150 ${
                    enabled
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NotificationSettings;