import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border p-6">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>

            {description && (
              <p className="mt-1 text-sm text-foreground-muted">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-surface-hover"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 border-t border-border p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}