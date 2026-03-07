import { FiUser } from 'react-icons/fi';

export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  className = ''
}) {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl'
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-md'
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBackgroundColor = (name) => {
    if (!name) return 'bg-gray-500';
    
    const colors = [
      'bg-red-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`${sizes[size]} ${shapes[shape]} object-cover ${className}`}
      />
    );
  }

  if (name) {
    return (
      <div
        className={`
          ${sizes[size]} ${shapes[shape]} ${getBackgroundColor(name)}
          flex items-center justify-center text-white font-medium
          ${className}
        `}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={`
        ${sizes[size]} ${shapes[shape]} bg-gray-300
        flex items-center justify-center text-gray-600
        ${className}
      `}
    >
      <FiUser className="h-1/2 w-1/2" />
    </div>
  );
}