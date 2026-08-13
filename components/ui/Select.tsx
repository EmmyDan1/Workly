"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
};

const Select = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  className,
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={twMerge("relative w-full", className)}
    >
      {label && (
        <label className="mb-2 block text-xs font-medium text-foreground-muted">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={twMerge(
          "flex h-11 w-full items-center justify-between rounded-xl",
          "border border-border bg-background px-3.5",
          "text-sm transition-all duration-150",
          "hover:border-foreground-muted",
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          isOpen && "border-primary/60 ring-2 ring-primary/10",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span
          className={twMerge(
            "truncate",
            selectedOption
              ? "text-foreground"
              : "text-foreground-muted"
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={16}
          className={twMerge(
            "shrink-0 text-foreground-muted transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[60] overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-xl shadow-black/10">
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={twMerge(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                    "transition-colors duration-100",
                    "hover:bg-surface-hover",
                    isSelected && "bg-surface-hover"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {option.label}
                    </p>

                    {option.description && (
                      <p className="mt-0.5 truncate text-xs text-foreground-muted">
                        {option.description}
                      </p>
                    )}
                  </div>

                  {isSelected && (
                    <Check
                      size={16}
                      className="shrink-0 text-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;