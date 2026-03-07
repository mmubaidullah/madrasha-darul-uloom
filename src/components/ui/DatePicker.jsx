'use client';
import { forwardRef } from 'react';
import { FiCalendar } from 'react-icons/fi';

const DatePicker = forwardRef(({ 
  label, 
  error, 
  required = false,
  value,
  onChange,
  min,
  max,
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
      <div className="relative">
        <input
          ref={ref}
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          className={`
            w-full rounded-md border-gray-300 shadow-sm 
            focus:border-green-500 focus:ring-green-500
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FiCalendar className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;