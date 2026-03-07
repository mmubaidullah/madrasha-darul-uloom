import { forwardRef } from 'react';

const RadioGroup = forwardRef(({ 
  label, 
  error, 
  options = [],
  name,
  value,
  onChange,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              ref={index === 0 ? ref : null}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className={`
                h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300
                ${error ? 'border-red-300 focus:ring-red-500' : ''}
                ${className}
              `}
              {...props}
            />
            <label className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;