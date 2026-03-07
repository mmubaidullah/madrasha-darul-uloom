'use client';
import { forwardRef } from 'react';

const Switch = forwardRef(({ 
  label, 
  error, 
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  ...props 
}, ref) => {
  const sizes = {
    sm: {
      switch: 'h-5 w-9',
      toggle: 'h-4 w-4',
      translate: checked ? 'translate-x-4' : 'translate-x-0'
    },
    md: {
      switch: 'h-6 w-11',
      toggle: 'h-5 w-5',
      translate: checked ? 'translate-x-5' : 'translate-x-0'
    },
    lg: {
      switch: 'h-7 w-14',
      toggle: 'h-6 w-6',
      translate: checked ? 'translate-x-7' : 'translate-x-0'
    }
  };

  const sizeConfig = sizes[size];

  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange && onChange(!checked)}
          className={`
            relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer 
            transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            ${checked ? 'bg-green-600' : 'bg-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${sizeConfig.switch}
            ${className}
          `}
          {...props}
        >
          <span
            className={`
              pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
              ${sizeConfig.toggle}
              ${sizeConfig.translate}
            `}
          />
        </button>
        {label && (
          <label className="ml-3 block text-sm text-gray-900">
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

Switch.displayName = 'Switch';

export default Switch;