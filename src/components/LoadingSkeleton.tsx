export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="card-glass p-6 animate-pulse-custom">
          {/* Image skeleton */}
          <div className="h-48 bg-muted rounded-xl mb-4"></div>
          
          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
            
            <div className="flex justify-between items-center pt-2">
              <div className="h-3 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-12"></div>
            </div>
            
            <div className="h-10 bg-muted rounded-full w-full mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};