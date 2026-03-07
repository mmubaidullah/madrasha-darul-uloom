import { forwardRef } from 'react';

const Slider = forwardRef(({ 
  label, 
  error, 
  required = false,
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  showValue = true,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="block text-sm font-medium text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {showValue && (
            <span className="text-sm text-gray-500">{value}</span>
          )}
        </div>
      )}
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`
          w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
          slider:bg-green-600 slider:rounded-lg
          ${error ? 'slider:bg-red-600' : ''}
          ${className}
        `}
        style={{
          background: `linear-gradient(to right, #10B981 0%, #10B981 ${((value - min) / (max - min)) * 100}%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`
        }}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;