import { settingsItems } from "@/data/SettingsItems";
import type { SettingsSection } from "@/types/projects";
type SettingsSidebarProps = {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
};

const SettingsSidebar = ({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) => {
  return (
    <aside className="w-full shrink-0 md:w-52">
      <nav className="space-y-1">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? "bg-surface text-foreground"
                  : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <Icon
                size={17}
                weight={isActive ? "regular" : "light"}
                className="shrink-0"
              />

              <div className="min-w-0">
                <p
                  className={`text-xs font-medium ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground-muted group-hover:text-foreground"
                  }`}
                >
                  {item.label}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-foreground-muted">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
