export default function Spinner({ 
  size = 'md', 
  color = 'green',
  className = '' 
}) {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colors = {
    green: 'border-green-600',
    blue: 'border-blue-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600',
    white: 'border-white'
  };

  return (
    <div
      className={`
        animate-spin rounded-full border-2 border-t-transparent
        ${sizes[size]} ${colors[color]} ${className}
      `}
    />
  );
}