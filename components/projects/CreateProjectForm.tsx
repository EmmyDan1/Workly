import CreateProjectFormData from "@/data/CreateFormProjectData";
import { useState } from "react";
import ProjectIcon from "./ProjectIcon";
import ProjectIconPicker from "./ProjectIconPicker";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

type CreateProjectFormProps = {
  form: CreateProjectFormData;

  updateForm: (field: keyof CreateProjectFormData, value: string) => void;

  error: string;

  onSubmit: (e: React.FormEvent) => void;

  onClose: () => void;
};
const CreateProjectForm = ({
  form,
  updateForm,
  error,
  onSubmit,
  onClose,
}: CreateProjectFormProps) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6 px-7 py-6">
        {/* Project identity */}
        <div className="flex items-start gap-4">
          <div className="relative mt-6 shrink-0">
            <button
              type="button"
              onClick={() => setPickerOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition hover:border-foreground-muted hover:bg-surface-hover"
              title="Change project icon"
              aria-label="Change project icon"
            >
              {form.emoji ? (
                <span className="text-xl leading-none">{form.emoji}</span>
              ) : (
                <ProjectIcon
                  icon={form.icon}
                  size={19}
                  className="text-foreground-muted"
                />
              )}
            </button>

            {pickerOpen && (
              <ProjectIconPicker
                currentIcon={form.icon}
                currentEmoji={form.emoji}
                onIconChange={(icon) => {
                  updateForm("icon", icon);
                  updateForm("emoji", "");
                }}
                onEmojiChange={(emoji) => {
                  updateForm("emoji", emoji);
                }}
                onClose={() => setPickerOpen(false)}
              />
            )}
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium text-foreground-muted">
              Project name
            </label>

            <Input
              autoFocus
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              placeholder="e.g. Website redesign"
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
            placeholder="What are you trying to accomplish with this project?"
          />

          <p className="mt-2 text-xs text-foreground-muted">
            Keep it short and clear. You can add more detail later.
          </p>
        </div>

        {/* Project metadata */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Status"
            value={form.status}
            onChange={(value) => updateForm("status", value)}
            options={[
              {
                value: "backlog",
                label: "Backlog",
                description: "Not planned yet",
              },
              {
                value: "planned",
                label: "Planned",
                description: "Ready to be worked on",
              },
              {
                value: "in-progress",
                label: "In Progress",
                description: "Currently being worked on",
              },
              {
                value: "completed",
                label: "Completed",
                description: "Project is finished",
              },
            ]}
          />

          <Select
            label="Priority"
            value={form.priority}
            onChange={(value) => updateForm("priority", value)}
            options={[
              {
                value: "low",
                label: "Low",
              },
              {
                value: "medium",
                label: "Medium",
              },
              {
                value: "high",
                label: "High",
              },
              {
                value: "urgent",
                label: "Urgent",
              },
            ]}
          />

          <Select
            label="Lead"
            value={form.lead}
            onChange={(value) => updateForm("lead", value)}
            options={[
              {
                value: "Daniel",
                label: "Daniel",
                description: "Project lead",
              },
            ]}
          />

          <Select
            label="Target date"
            value={form.targetDate}
            onChange={(value) => updateForm("targetDate", value)}
            options={[
              {
                value: "This month",
                label: "This month",
              },
              {
                value: "Next month",
                label: "Next month",
              },
              {
                value: "This quarter",
                label: "This quarter",
              },
              {
                value: "No date",
                label: "No date",
              },
            ]}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-surface/40 px-7 py-4">
        <p className="hidden text-xs text-foreground-muted sm:block">
          You can change these settings later.
        </p>

        <div className="ml-auto flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">Create project</Button>
        </div>
      </div>
    </form>
  );
};
export default CreateProjectForm;
