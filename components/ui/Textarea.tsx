import * as React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  className,
  ...props
}: Props) {
  return (
    <textarea
      className={twMerge(
        "min-h-32 w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-primary",
        className
      )}
      {...props}
    />
  );
}