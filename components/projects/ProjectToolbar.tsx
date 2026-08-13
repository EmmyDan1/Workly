"use client";

import {
  ChevronDown,
  Filter,
  LayoutGrid,
  PanelRightOpen,
  Plus,
} from "lucide-react";

const ProjectsToolbar = () => {
  return (
    <div className="flex  items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap">
        <button className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover">
          <span>All Projects</span>
          <ChevronDown size={16} />
        </button>

        <button className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground">
          <Plus size={15}  />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <button
          title="Filter"
          className="rounded-lg p-2 text-foreground-muted transition-all hover:bg-surface-hover hover:text-foreground"
        >
          <Filter size={17} />
        </button>

        <button
          title="Display"
          className="rounded-lg p-2 text-foreground-muted transition-all hover:bg-surface-hover hover:text-foreground"
        >
          <LayoutGrid size={17} />
        </button>

        <button
          title="Details"
          className="rounded-lg p-2 text-foreground-muted transition-all hover:bg-surface-hover hover:text-foreground"
        >
          <PanelRightOpen size={17} />
        </button>
      </div>
    </div>
  );
};

export default ProjectsToolbar;
