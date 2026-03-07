import { forwardRef } from 'react';

const Checkbox = forwardRef(({ 
  label, 
  error, 
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={`
            h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded
            ${error ? 'border-red-300 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {label && (
          <label className="ml-2 block text-sm text-gray-900">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;