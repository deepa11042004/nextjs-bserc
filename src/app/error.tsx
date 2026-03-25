'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import "./globals.css";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black px-4">
      <div className="text-center max-w-md">
        <div className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-4">Error</div>
        <h1 className="font-display text-4xl font-black text-white mb-4">Something went wrong</h1>
        <p className="text-white/50 text-sm mb-8">{error.message || 'An unexpected error occurred.'}</p>
        <Button variant="primary" onClick={reset}>Try Again</Button>
      </div>
    </div>
  )
}
