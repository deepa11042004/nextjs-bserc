// components/forms/StatusMessage.tsx
"use client";

interface Props {
  type: "success" | "error" | "info";
  message: string;
  onDismiss?: () => void;
  autoDismiss?: boolean;
}

export default function StatusMessage({ 
  type, 
  message, 
  onDismiss,
  autoDismiss = true 
}: Props) {
  const styles = {
    success: {
      bg: "bg-green-900/20",
      border: "border-green-800",
      text: "text-green-300",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-900/20",
      border: "border-red-800",
      text: "text-red-300",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-900/20",
      border: "border-blue-800",
      text: "text-blue-300",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const style = styles[type];

  return (
    <div 
      className={`
        flex items-start gap-3 p-4 rounded-lg border ${style.bg} ${style.border} ${style.text}
        animate-in slide-in-from-top-2 duration-200
      `}
      role="alert"
    >
      {style.icon}
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`p-1 rounded hover:bg-white/10 transition-colors ${style.text}`}
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}