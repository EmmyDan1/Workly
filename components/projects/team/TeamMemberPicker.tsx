"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import type { ProjectMember } from "@/types/projects";

type TeamMemberPickerProps = {
  teamMembers: ProjectMember[];
  availableMembers: ProjectMember[];
  onAddMember: (memberId: string) => void;
};

const TeamMemberPicker = ({
  teamMembers,
  availableMembers,
  onAddMember,
}: TeamMemberPickerProps) => {
  const [memberPickerOpen, setMemberPickerOpen] = useState(false);

  return (
    <div className="relative mb-3 w-full flex items-center justify-between">
      <div>
        <h2 className="text-xs font-semibold text-foreground">
          Members
        </h2>

        <p className="mt-0.5 text-[11px] text-foreground-muted">
          {teamMembers.length}{" "}
          {teamMembers.length === 1 ? "person" : "people"} on this team
        </p>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setMemberPickerOpen((open) => !open)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
        >
          <Plus size={14} />
          Add members
        </button>

        {memberPickerOpen && (
          <div className="absolute right-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-background shadow-xl">
            <div className="border-b border-border px-3 py-2.5">
              <p className="text-xs font-medium text-foreground">
                Add members
              </p>

              <p className="mt-0.5 text-[11px] text-foreground-muted">
                Select people to add to this team.
              </p>
            </div>

            <div className="max-h-60 overflow-y-auto p-1">
              {availableMembers.length > 0 ? (
                availableMembers.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => {
                      onAddMember(member.id);
                      setMemberPickerOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition hover:bg-surface-hover"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-[10px] font-medium text-background">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        member.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">
                        {member.name}
                      </p>

                      <p className="truncate text-[10px] text-foreground-muted">
                        {member.email}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center">
                  <p className="text-xs text-foreground-muted">
                    Everyone is already on this team.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberPicker;