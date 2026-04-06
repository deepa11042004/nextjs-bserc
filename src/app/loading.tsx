"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border border-primary/20 blur-sm" />

          {/* Main spinning ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />

          {/* Reverse inner ring */}
          <div
            className="absolute inset-6 rounded-full border-t-2 border-primary/60 animate-spin"
            style={{
              animationDirection: "reverse",
              animationDuration: "0.7s",
            }}
          />

           
        </div>

        {/* Text */}
        <p className="font-mono text-xs tracking-[0.35em] text-primary/70 uppercase animate-pulse">
          Initialising
        </p>
      </div>
    </div>
  );
}