// components/forms/SubmitButton.tsx
"use client";

interface Props {
  isSubmitting?: boolean;
  submitStatus?: "idle" | "success" | "error" | null;
  label?: string;
  submittingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  fullWidth?: boolean;
}

export default function SubmitButton({ 
  isSubmitting = false, 
  submitStatus = "idle", 
  label = "Submit Request",
  submittingLabel = "Processing...",
  successLabel = "✓ Submitted!",
  errorLabel = "Try Again",
  fullWidth = true,
}: Props) {
  const baseClasses = `
    py-3 px-6 rounded-lg font-semibold text-white
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-offset-slate-900 transition-all duration-200 
    flex items-center justify-center gap-2
    disabled:cursor-not-allowed
  `;
  
  const statusClasses = {
    idle: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40",
    submitting: "bg-slate-700 cursor-wait",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-lg shadow-green-900/20",
    error: "bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-900/20 animate-pulse",
  };

  const currentStatus = isSubmitting ? "submitting" : submitStatus || "idle";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`${baseClasses} ${statusClasses[currentStatus]} ${fullWidth ? "w-full" : ""}`}
    >
      {isSubmitting ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{submittingLabel}</span>
        </>
      ) : submitStatus === "success" ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successLabel}</span>
        </>
      ) : submitStatus === "error" ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>{errorLabel}</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </>
      )}
    </button>
  );
}