"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

export type FormResponseType = "success" | "info" | "error";

type FormResponseOverlayProps = {
  visible: boolean;
  type: FormResponseType;
  message: string;
  onClose: () => void;
};

const typeStyles: Record<FormResponseType, string> = {
  success: "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
  info: "border-sky-400/60 bg-sky-500/10 text-sky-100",
  error: "border-rose-400/60 bg-rose-500/10 text-rose-100",
};

const typeTitles: Record<FormResponseType, string> = {
  success: "Success",
  info: "Information",
  error: "Submission Error",
};

function ResponseIcon({ type }: { type: FormResponseType }) {
  if (type === "success") {
    return <CheckCircle2 className="h-5 w-5 text-emerald-300" />;
  }

  if (type === "info") {
    return <Info className="h-5 w-5 text-sky-300" />;
  }

  return <AlertTriangle className="h-5 w-5 text-rose-300" />;
}

export default function FormResponseOverlay({
  visible,
  type,
  message,
  onClose,
}: FormResponseOverlayProps) {
  if (!visible || !message.trim()) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close notification backdrop"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role={type === "error" ? "alertdialog" : "dialog"}
        aria-modal="true"
        className={`relative w-full max-w-lg rounded-xl border px-5 py-4 shadow-2xl ${typeStyles[type]}`}
      >
        <div className="mb-4 flex items-start gap-3">
          <ResponseIcon type={type} />
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/90">
              {typeTitles[type]}
            </p>
            <p className="mt-1 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}