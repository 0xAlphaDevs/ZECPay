export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-black animate-spin"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

