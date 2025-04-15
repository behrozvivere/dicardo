export function NumberCardSkeleton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="compact-card skeleton-shimmer">
        <div className="h-10 w-10 rounded-full"></div>
        <div className="flex-1 mx-3">
          <div className="h-5 w-24 rounded-md mb-1"></div>
          <div className="h-3 w-32 rounded-md"></div>
        </div>
        <div className="h-5 w-20 rounded-md"></div>
      </div>
    )
  }

  return (
    <div className="product-card p-5 skeleton-shimmer">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full mr-3"></div>
        <div className="flex-1">
          <div className="h-5 w-32 rounded-md mb-1"></div>
          <div className="h-4 w-24 rounded-md"></div>
        </div>
        <div className="h-5 w-20 rounded-md"></div>
      </div>

      <div className="h-4 w-48 rounded-md mb-4"></div>

      <div className="flex justify-between items-center">
        <div className="h-8 w-20 rounded-md"></div>
        <div className="h-8 w-24 rounded-md"></div>
      </div>
    </div>
  )
}
