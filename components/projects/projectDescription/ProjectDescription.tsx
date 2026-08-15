import { Project } from "@/types/projects";
type ProjectDescriptionProps = {
  project: Project;
  editingDescription: boolean;
  description: string;
  setEditingDescription: (value: boolean) => void;
  setDescription: (value: string) => void;
  onSave: () => void;
};
const ProjectDescription = ({
  project,
  editingDescription,
  description,
  setEditingDescription,
  setDescription,
  onSave,
}: ProjectDescriptionProps) => {
  return (
    <section className="border-b border-border py-7">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Description</h2>

        {!editingDescription && (
          <button
            type="button"
            onClick={() => {
              setDescription(project.description);
              setEditingDescription(true);
            }}
            className="rounded-md px-2.5 py-1.5 text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            Edit
          </button>
        )}
      </div>

      {editingDescription ? (
        <div className="mt-3 max-w-3xl">
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            autoFocus
            className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2.5 text-sm leading-6 text-foreground outline-none transition focus:border-foreground-muted"
            placeholder="Describe what this project is about..."
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setDescription(project.description);
                setEditingDescription(false);
              }}
              className="rounded-md px-2.5 py-1.5 text-xs text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSave}
              className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-foreground-muted">
          {project.description || "Add a description for this project."}
        </p>
      )}
    </section>
  );
};
export default ProjectDescription;
