"use client";

import { useState } from "react";
import { Check, Users } from "lucide-react";

import type { ProjectMember } from "@/types/projects";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

type CreateTeamFormProps = {
  form: {
    name: string;
    description: string;
    memberIds: string[];
  };
  members: ProjectMember[];
  updateForm: (
    field: "name" | "description" | "memberIds",
    value: string | string[],
  ) => void;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

const CreateTeamForm = ({
  form,
  members,
  updateForm,
  error,
  onSubmit,
  onClose,
}: CreateTeamFormProps) => {
  const [membersOpen, setMembersOpen] = useState(false);

  const toggleMember = (memberId: string) => {
    const alreadySelected = form.memberIds.includes(memberId);

    updateForm(
      "memberIds",
      alreadySelected
        ? form.memberIds.filter((id) => id !== memberId)
        : [...form.memberIds, memberId],
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6 px-7 py-6">
        {/* Team identity */}
        <div className="flex items-start gap-4">
          <div className="mt-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
            <Users
              size={19}
              strokeWidth={1.8}
              className="text-foreground-muted"
            />
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium text-foreground-muted">
              Team name
            </label>

            <Input
              autoFocus
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              placeholder="e.g. Engineering"
            />

            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-xs font-medium text-foreground-muted">
            Description
          </label>

          <Textarea
            value={form.description}
            onChange={(e) => updateForm("description", e.target.value)}
            placeholder="What does this team work on?"
          />

          <p className="mt-2 text-xs text-foreground-muted">
            Keep it short. You can change it later.
          </p>
        </div>

        {/* Members */}
        <div className="relative">
          <label className="mb-2 block text-xs font-medium text-foreground-muted">
            Members
          </label>

          <button
            type="button"
            onClick={() => setMembersOpen((open) => !open)}
            className="flex h-10 w-full items-center justify-between rounded-lg border border-border bg-surface px-3 text-xs text-foreground transition hover:bg-surface-hover"
          >
            <span>
              {form.memberIds.length === 0
                ? "Select members"
                : `${form.memberIds.length} ${
                    form.memberIds.length === 1 ? "member" : "members"
                  } selected`}
            </span>

            <Users size={15} className="text-foreground-muted" />
          </button>

          {membersOpen && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-border bg-background shadow-xl">
              {members.map((member) => {
                const selected = form.memberIds.includes(member.id);

                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.id)}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-surface-hover"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-[9px] font-medium text-background">
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

                      <p className="truncate text-[10px] text-foreground-muted">
                        {member.email}
                      </p>
                    </div>

                    {selected && (
                      <Check size={15} className="text-foreground" />
                    )}
                  </button>
                );
              })}

              {members.length === 0 && (
                <p className="px-3 py-4 text-xs text-foreground-muted">
                  No members available.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-surface/40 px-7 py-4">
        <p className="hidden text-xs text-foreground-muted sm:block">
          You can manage team members later.
        </p>

        <div className="ml-auto flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">Create team</Button>
        </div>
      </div>
    </form>
  );
};

export default CreateTeamForm;
