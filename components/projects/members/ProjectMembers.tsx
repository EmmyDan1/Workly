"use client";

import { UserRound, UserPlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/types/projects";
import { useMember } from "@/components/providers/MemberProvider";
import { useProject } from "@/components/providers/ProjectProvider";

type ProjectMembersProps = {
  project: Project;
};

const ProjectMembers = ({ project }: ProjectMembersProps) => {
  const { members } = useMember();
  const { updateProject } = useProject();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const projectMemberIds = project.memberIds ?? [];

  const projectMembers = members.filter((member) =>
    projectMemberIds.includes(member.id),
  );

  const availableMembers = members.filter(
    (member) => !projectMemberIds.includes(member.id),
  );

  const toggleMember = (memberId: string) => {
    const isMember = projectMemberIds.includes(memberId);

    const nextMemberIds = isMember
      ? projectMemberIds.filter((id) => id !== memberId)
      : [...projectMemberIds, memberId];

    updateProject(project.id, {
      memberIds: nextMemberIds,
      members: nextMemberIds.length,
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Current members */}
      <div className="flex -space-x-1.5">
        {projectMembers.map((member) => (
          <div
            key={member.id}
            title={member.name}
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-foreground text-[10px] font-medium text-background"
          >
            {member.name.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>

      {/* Add member */}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-dashed border-border text-foreground-muted transition hover:border-foreground-muted hover:bg-surface-hover hover:text-foreground"
        >
          <UserPlus size={13} />
        </button>

        {open && (
          <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-56 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-xl shadow-black/10">
            <div className="px-2.5 py-2">
              <p className="text-xs font-medium text-foreground">
                Project members
              </p>

              <p className="mt-0.5 text-[11px] text-foreground-muted">
                Add or remove people from this project.
              </p>
            </div>

            {projectMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => toggleMember(member.id)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate">{member.name}</p>
                  <p className="truncate text-[10px] text-foreground-muted">
                    {member.email}
                  </p>
                </div>

                <X size={13} className="text-foreground-muted" />
              </button>
            ))}

            {availableMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => toggleMember(member.id)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-medium text-foreground-muted">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate">{member.name}</p>
                  <p className="truncate text-[10px] text-foreground-muted">
                    {member.email}
                  </p>
                </div>

                <UserRound size={13} className="text-foreground-muted" />
              </button>
            ))}

            <div className="my-1 border-t border-border" />

            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
            >
              <UserPlus size={14} />
              Invite people
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectMembers;
