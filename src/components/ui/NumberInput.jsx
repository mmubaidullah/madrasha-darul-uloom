import { forwardRef } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const NumberInput = forwardRef(({ 
  label, 
  error, 
  required = false,
  min,
  max,
  step = 1,
  value = 0,
  onChange,
  showControls = true,
  className = '',
  ...props 
}, ref) => {
  const handleIncrement = () => {
    const newValue = Number(value) + Number(step);
    if (max === undefined || newValue <= max) {
      onChange && onChange({ target: { value: newValue } });
    }
  };

  const handleDecrement = () => {
    const newValue = Number(value) - Number(step);
    if (min === undefined || newValue >= min) {
      onChange && onChange({ target: { value: newValue } });
    }
  };

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
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className={`
            w-full rounded-md border-gray-300 shadow-sm 
            focus:border-green-500 focus:ring-green-500
            ${showControls ? 'pr-16' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {showControls && (
          <div className="absolute inset-y-0 right-0 flex">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={min !== undefined && Number(value) <= min}
              className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiMinus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={max !== undefined && Number(value) >= max}
              className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;