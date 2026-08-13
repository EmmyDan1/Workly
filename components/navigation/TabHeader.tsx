"use client";

import { Tab } from "@/types/navigation";

type TabHeaderProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const TabHeader = ({
  tabs,
  activeTab,
  onTabChange,
}: TabHeaderProps) => {
  if (tabs.length === 0) return null;

  return (
    <nav className="border-b border-border px-6">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabHeader;