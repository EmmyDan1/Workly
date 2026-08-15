"use client";
import { ArrowLeft, MoreHorizontal, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTeam } from "@/components/providers/TeamProvider";
import { useMember } from "@/components/providers/MemberProvider";
import TeamMemberPicker from "@/components/projects/team/TeamMemberPicker";
import DeleteTeamDialog from "@/components/projects/team/DeleteTeamDialog";
import EditTeamModal from "@/components/projects/team/EditTeamModal";

const TeamDetailPage = () => {
  const [teamActionsOpen, setTeamActionsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editTeamOpen, setEditTeamOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const teamId = params.teamId as string;

  const { getTeam, updateTeam, deleteTeam } = useTeam();
  const { members } = useMember();

  const team = getTeam(teamId);

  if (!team) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <h2 className="text-sm font-medium text-foreground">Team not found</h2>

        <p className="mt-1 text-xs text-foreground-muted">
          This team may have been deleted or no longer exists.
        </p>

        <button
          type="button"
          onClick={() => router.push("/teams")}
          className="mt-4 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-hover"
        >
          Back to teams
        </button>
      </div>
    );
  }

  const teamMembers = members.filter((member) =>
    team.memberIds.includes(member.id),
  );
  const availableMembers = members.filter(
    (member) => !team.memberIds.includes(member.id),
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/teams")}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-foreground-muted transition hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Teams
      </button>

      {/* Team header */}
      <div className="flex items-start justify-between border-b border-border pb-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
            <Users
              size={17}
              strokeWidth={1.8}
              className="text-foreground-muted"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight text-foreground">
              {team.name}
            </h1>

            {team.description && (
              <p className="mt-1 text-xs text-foreground-muted">
                {team.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label={`More options for ${team.name}`}
            aria-expanded={teamActionsOpen}
            onClick={() => setTeamActionsOpen((open) => !open)}
            className="rounded-md p-1.5 text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            <MoreHorizontal size={16} />
          </button>

          {teamActionsOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-background p-1 shadow-xl">
              <button
                type="button"
                className="flex w-full rounded-md px-3 py-2 text-left text-xs text-foreground transition hover:bg-surface-hover"
                onClick={() => {
                  setTeamActionsOpen(false);
                  setEditTeamOpen(true);
                }}
              >
                Edit team
              </button>

              <button
                type="button"
                className="flex w-full rounded-md px-3 py-2 text-left text-xs text-red-500 transition hover:bg-red-500/10"
                onClick={() => {
                  setTeamActionsOpen(false);
                  setDeleteConfirmOpen(true);
                }}
              >
                Delete team
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Members */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <TeamMemberPicker
            teamMembers={teamMembers}
            availableMembers={availableMembers}
            onAddMember={(memberId) => {
              updateTeam(team.id, {
                memberIds: [...team.memberIds, memberId],
              });
            }}
          />
        </div>

        <div className="divide-y divide-border border-y border-border">
          {teamMembers.map((member) => (
            <div key={member.id} className="group flex items-center gap-3 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-[10px] font-medium text-background">
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

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                  {member.name}
                </p>

                <p className="truncate text-[11px] text-foreground-muted">
                  {member.email}
                </p>
              </div>

              <button
                type="button"
                aria-label={`Remove ${member.name} from ${team.name}`}
                onClick={() => {
                  updateTeam(team.id, {
                    memberIds: team.memberIds.filter(
                      (memberId) => memberId !== member.id,
                    ),
                  });
                }}
                className="shrink-0 rounded-md p-1.5 text-foreground-muted opacity-0 transition hover:bg-surface-hover hover:text-foreground group-hover:opacity-100"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="border-y border-border py-10 text-center">
            <p className="text-xs text-foreground-muted">
              No members have been added to this team yet.
            </p>
          </div>
        )}
      </section>
      {deleteConfirmOpen && (
        <DeleteTeamDialog
          teamName={team.name}
          onCancel={() => setDeleteConfirmOpen(false)}
          onConfirm={() => {
            deleteTeam(team.id);
            setDeleteConfirmOpen(false);
            router.push("/teams");
          }}
        />
      )}
      {editTeamOpen && (
        <EditTeamModal
          teamName={team.name}
          teamDescription={team.description}
          onClose={() => setEditTeamOpen(false)}
          onSave={(updates) => {
            updateTeam(team.id, updates);
            setEditTeamOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TeamDetailPage;
