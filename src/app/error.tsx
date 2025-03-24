"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

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
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        An error occurred while loading this page. Please try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}

