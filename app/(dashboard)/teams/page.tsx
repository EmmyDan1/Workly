"use client";

import { ChevronRight, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { useTeam } from "@/components/providers/TeamProvider";
import CreateTeamModal from "@/components/projects/team/CreateTeamModal";

export default function TeamsPage() {
  const { teams, openCreateTeamModal } = useTeam();
  const router = useRouter();

  return (
    <>
      {/* Page header */}
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            Teams
          </h1>

          <p className="mt-1 text-xs text-foreground-muted">
            Organize people around shared work.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateTeamModal}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition hover:opacity-90"
        >
          <Plus size={14} strokeWidth={2} />
          <span>New team</span>
        </button>
      </div>

      {/* Team list */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        {teams.length > 0 ? (
          <div className="divide-y divide-border">
            {teams.map((team) => (
              <div
                key={team.id}
                role="link"
                tabIndex={0}
                onClick={() => router.push(`/teams/${team.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/teams/${team.id}`);
                  }
                }}
                className="group flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-hover"
              >
                {/* Team icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
                  <Users
                    size={16}
                    strokeWidth={1.8}
                    className="text-foreground-muted"
                  />
                </div>

                {/* Team information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-medium text-foreground">
                      {team.name}
                    </h2>

                    <ChevronRight
                      size={14}
                      className="shrink-0 text-foreground-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </div>

                  {team.description && (
                    <p className="mt-0.5 truncate text-[11px] text-foreground-muted">
                      {team.description}
                    </p>
                  )}
                </div>

                {/* Member count */}
                <div className="flex shrink-0 items-center gap-1.5 text-[11px] text-foreground-muted">
                  <Users size={13} strokeWidth={1.8} />

                  <span>
                    {team.memberIds.length}{" "}
                    {team.memberIds.length === 1 ? "member" : "members"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <Users
              size={20}
              strokeWidth={1.7}
              className="mx-auto text-foreground-muted"
            />

            <p className="mt-3 text-sm font-medium text-foreground">
              No teams yet
            </p>

            <p className="mt-1 text-xs text-foreground-muted">
              Create a team to organize people around shared work.
            </p>

            <button
              type="button"
              onClick={openCreateTeamModal}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition hover:opacity-90"
            >
              <Plus size={14} />
              Create team
            </button>
          </div>
        )}
      </div>

      <CreateTeamModal />
    </>
  );
}