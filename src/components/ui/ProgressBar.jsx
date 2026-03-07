export default function ProgressBar({ 
  value, 
  max = 100, 
  color = 'green',
  size = 'md',
  showLabel = false,
  label,
  className = ''
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    gray: 'bg-gray-600'
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <div
          className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}