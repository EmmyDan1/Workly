"use client";

import { useState } from "react";
import { User } from "@phosphor-icons/react";

const ProfileSettings = () => {
  const [name, setName] = useState(() => {
    if (typeof window === "undefined") {
      return "Daniel";
    }

    try {
      const savedProfile = localStorage.getItem("workly-profile");

      if (!savedProfile) {
        return "Daniel";
      }

      const profile = JSON.parse(savedProfile);

      return profile.name ?? "Daniel";
    } catch {
      return "Daniel";
    }
  });

  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    try {
      const savedProfile = localStorage.getItem("workly-profile");

      if (!savedProfile) {
        return "";
      }

      const profile = JSON.parse(savedProfile);

      return profile.email ?? "";
    } catch {
      return "";
    }
  });

  const [profileSaved, setProfileSaved] = useState(false);

  const handleSaveProfile = () => {
    localStorage.setItem(
      "workly-profile",
      JSON.stringify({
        name: name.trim(),
        email: email.trim(),
      }),
    );

    setProfileSaved(true);

    setTimeout(() => {
      setProfileSaved(false);
    }, 2500);
  };

  return (
    <section className="overflow-hidden rounded-xl border border-border">
      {/* Section header */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <User
            size={16}
            weight="regular"
            className="text-foreground-muted"
          />

          <h2 className="text-xs font-medium text-foreground">
            Personal information
          </h2>
        </div>

        <p className="mt-1 text-[11px] text-foreground-muted">
          Update the information associated with your Workly account.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5 p-5">
        <div>
          <label
            htmlFor="settings-name"
            className="mb-2 block text-[11px] font-medium text-foreground"
          >
            Name
          </label>

          <input
            id="settings-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5"
          />
        </div>

        <div>
          <label
            htmlFor="settings-email"
            className="mb-2 block text-[11px] font-medium text-foreground"
          >
            Email
          </label>

          <input
            id="settings-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
          {profileSaved && (
            <p className="text-[11px] text-foreground-muted">
              Changes saved
            </p>
          )}

          <button
            type="button"
            onClick={handleSaveProfile}
            className="rounded-md bg-foreground px-3.5 py-2 text-xs font-medium text-background transition hover:opacity-90"
          >
            Save changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;