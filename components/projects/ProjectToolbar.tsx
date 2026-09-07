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
      </div>

    </div>
  );
};

export default ProjectsToolbar;
