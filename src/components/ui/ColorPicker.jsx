import { forwardRef } from 'react';

const ColorPicker = forwardRef(({ 
  label, 
  error, 
  required = false,
  value = '#000000',
  onChange,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center space-x-3">
        <input
          ref={ref}
          type="color"
          value={value}
          onChange={onChange}
          className={`
            h-10 w-16 rounded-md border border-gray-300 cursor-pointer
            ${error ? 'border-red-300' : ''}
            ${className}
          `}
          {...props}
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`
            flex-1 rounded-md border-gray-300 shadow-sm 
            focus:border-green-500 focus:ring-green-500
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
          `}
          placeholder="#000000"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;