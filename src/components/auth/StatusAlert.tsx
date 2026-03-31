"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatusVariant = "success" | "error" | "info";

const palette: Record<StatusVariant, { bg: string; border: string; text: string }> = {
  success: {
    bg: "bg-emerald-900/70",
    border: "border-emerald-600",
    text: "text-emerald-200",
  },
  error: {
    bg: "bg-rose-900/70",
    border: "border-rose-600",
    text: "text-rose-200",
  },
  info: {
    bg: "bg-slate-900/70",
    border: "border-slate-700",
    text: "text-slate-200",
  },
};

interface StatusAlertProps {
  message: ReactNode;
  type?: StatusVariant;
  onClose?: () => void;
}

export function StatusAlert({
  message,
  type = "info",
  onClose,
}: StatusAlertProps) {
  const styles = palette[type];

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm",
        styles.bg,
        styles.border,
        styles.text,
      )}
      role="status"
    >
      <div>{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-full p-1 text-current hover:bg-white/10"
          aria-label="Dismiss message"
        >
          <span aria-hidden>×</span>
        </button>
      )}
    </div>
  );
}
