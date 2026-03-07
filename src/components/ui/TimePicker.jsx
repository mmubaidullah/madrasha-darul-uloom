'use client';
import { forwardRef } from 'react';
import { FiClock } from 'react-icons/fi';

const TimePicker = forwardRef(({ 
  label, 
  error, 
  required = false,
  value,
  onChange,
  min,
  max,
  step = 1,
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
          type="time"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className={`
            w-full rounded-md border-gray-300 shadow-sm 
            focus:border-green-500 focus:ring-green-500
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FiClock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;