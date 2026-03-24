// components/forms/SecurityNotice.tsx
"use client";

export default function SecurityNotice() {
  return (
    <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg text-blue-300 text-sm flex items-start gap-3">
      <svg 
        className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
        />
      </svg>
      <div>
        <p className="font-medium">Your data is protected</p>
        <p className="text-blue-400/80 mt-1">
          All submissions are encrypted, rate-limited, and transmitted securely. 
          We never share your information without consent.
        </p>
      </div>
    </div>
  );
}