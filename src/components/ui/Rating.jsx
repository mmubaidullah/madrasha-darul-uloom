'use client';
import { useState } from 'react';
import { FiStar } from 'react-icons/fi';

export default function Rating({
  value = 0,
  onChange,
  max = 5,
  size = 'md',
  readonly = false,
  showValue = false,
  className = ''
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (!readonly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex">
        {Array.from({ length: max }, (_, index) => {
          const rating = index + 1;
          const isFilled = rating <= displayValue;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(rating)}
              onMouseEnter={() => handleMouseEnter(rating)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={`
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                transition-all duration-150
                ${isFilled ? 'text-yellow-400' : 'text-gray-300'}
              `}
            >
              <FiStar 
                className={`${sizes[size]} ${isFilled ? 'fill-current' : ''}`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-2">
          {value}/{max}
        </span>
      )}
    </div>
  );
}