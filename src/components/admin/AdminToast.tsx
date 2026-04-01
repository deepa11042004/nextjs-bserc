"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";

type AdminToastVariant = "success" | "error" | "info";

interface AdminToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  variant?: AdminToastVariant;
  durationMs?: number;
}

const palette: Record<
  AdminToastVariant,
  { container: string; icon: string; Icon: typeof CheckCircle2 }
> = {
  success: {
    container: "border-emerald-500/70 bg-emerald-950/95 text-emerald-100",
    icon: "text-emerald-300",
    Icon: CheckCircle2,
  },
  error: {
    container: "border-rose-500/70 bg-rose-950/95 text-rose-100",
    icon: "text-rose-300",
    Icon: AlertCircle,
  },
  info: {
    container: "border-sky-500/70 bg-slate-900/95 text-sky-100",
    icon: "text-sky-300",
    Icon: Info,
  },
};

export function AdminToast({
  open,
  message,
  onClose,
  variant = "info",
  durationMs = 3000,
}: AdminToastProps) {
  useEffect(() => {
    if (!open || durationMs <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, durationMs);

    return () => window.clearTimeout(timeoutId);
  }, [open, durationMs, onClose]);

  if (!open || !message) {
    return null;
  }

  const styles = palette[variant];
  const Icon = styles.Icon;

  return (
    <div
      className={cn(
        "fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-lg border px-4 py-3 shadow-xl backdrop-blur",
        styles.container,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2.5">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", styles.icon)} />
        <p className="text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded p-1 text-current/80 transition-colors hover:bg-white/10 hover:text-current"
          aria-label="Dismiss notification"
        >
          <span aria-hidden>×</span>
        </button>
      </div>
    </div>
  );
}