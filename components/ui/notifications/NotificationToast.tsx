"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";

type NotificationType = "success" | "error" | "info";

type NotificationToastProps = {
  message: string;
  type: NotificationType;
  onClose: () => void;
};

const NotificationToast = ({
  message,
  type,
  onClose,
}: NotificationToastProps) => {
  const Icon =
    type === "success"
      ? CheckCircle2
      : type === "error"
        ? XCircle
        : Info;

  const iconClass =
    type === "success"
      ? "text-emerald-500"
      : type === "error"
        ? "text-red-500"
        : "text-blue-500";

  return (
    <div className="pointer-events-auto flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-xl">
      <Icon
        size={17}
        className={`mt-0.5 shrink-0 ${iconClass}`}
      />

      <p className="min-w-0 flex-1 text-xs font-medium leading-5 text-foreground">
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="shrink-0 rounded-md p-1 text-foreground-muted transition hover:bg-surface hover:text-foreground"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default NotificationToast;