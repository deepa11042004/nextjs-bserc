"use client"
 
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
          <div className="absolute inset-2 rounded-full border-t-2 border-primary/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-primary/60 uppercase">
          Initialising
        </p>
      </div>
    </div>
  )
}
