"use client";

import { X, Users } from "lucide-react";
import { useState } from "react";

import { useTeam } from "@/components/providers/TeamProvider";
import { useMember } from "@/components/providers/MemberProvider";
import { useNotification } from "@/components/providers/NotificationProvider";

import CreateTeamForm from "./CreateTeamForm";

const CreateTeamModal = () => {
  const { teams, addTeam, isCreateTeamOpen, closeCreateTeamModal } = useTeam();
  const { members } = useMember();
  const { notify } = useNotification();

  const [form, setForm] = useState({
    name: "",
    description: "",
    memberIds: [] as string[],
  });

  const [error, setError] = useState("");

  const updateForm = (
    field: "name" | "description" | "memberIds",
    value: string | string[],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Give your team a name before creating it.");
      return;
    }

    const teamNameExists = teams.some(
      (team) =>
        team.name.toLowerCase().trim() === form.name.toLowerCase().trim(),
    );

    if (teamNameExists) {
      setError("A team with this name already exists.");
      return;
    }

    addTeam({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      memberIds: form.memberIds,
      createdAt: new Date().toISOString(),
    });

    notify.success("Team created successfully");

    setForm({
      name: "",
      description: "",
      memberIds: [],
    });

    setError("");
    closeCreateTeamModal();
  };
  if (!isCreateTeamOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={closeCreateTeamModal}
        className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
      />

      {/* Modal */}
      <div className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-7 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface">
              <Users
                size={19}
                strokeWidth={1.8}
                className="text-foreground-muted"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Create team
              </h2>

              <p className="mt-1 text-sm text-foreground-muted">
                Create a team to organize people around shared work.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCreateTeamModal}
            className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <CreateTeamForm
          form={form}
          members={members}
          updateForm={updateForm}
          error={error}
          onSubmit={handleCreateTeam}
          onClose={closeCreateTeamModal}
        />
      </div>
    </div>
  );
};

export default CreateTeamModal;
