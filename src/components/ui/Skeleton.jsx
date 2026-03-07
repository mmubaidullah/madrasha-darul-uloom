export default function Skeleton({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  count = 1,
  circle = false
}) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`animate-pulse bg-gray-200 ${circle ? 'rounded-full' : 'rounded'} ${width} ${height} ${className}`}
    />
  ));

  return count === 1 ? skeletons[0] : <div className="space-y-2">{skeletons}</div>;
}

export function SkeletonCard() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="animate-pulse">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-3">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }, (_, index) => (
              <div key={index} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="px-6 py-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {Array.from({ length: columns }, (_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}