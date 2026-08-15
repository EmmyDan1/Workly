"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useNotification } from "@/components/providers/NotificationProvider";

type EditTeamModalProps = {
  teamName: string;
  teamDescription?: string;
  onSave: (updates: { name: string; description: string }) => void;
  onClose: () => void;
};

const EditTeamModal = ({
  teamName,
  teamDescription = "",
  onSave,
  onClose,
}: EditTeamModalProps) => {
  const [name, setName] = useState(teamName);
  const [description, setDescription] = useState(teamDescription);
  const [error, setError] = useState("");

  const { notify } = useNotification();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Give your team a name before saving.");
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
    });

    notify.success("Team changes saved");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-team-title"
        className="w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6">
            <h2
              id="edit-team-title"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              Edit team
            </h2>

            <p className="mt-1 text-xs text-foreground-muted">
              Update your team's basic information.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium text-foreground-muted">
                  Team name
                </label>

                <input
                  autoFocus
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
                  placeholder="e.g. Engineering"
                />

                {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-foreground-muted">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground-muted"
                  placeholder="What does this team work on?"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border bg-surface/40 px-6 py-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeamModal;
