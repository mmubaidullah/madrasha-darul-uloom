import { forwardRef } from 'react';
import { FiPhone } from 'react-icons/fi';

const PhoneInput = forwardRef(({ 
  label, 
  error, 
  required = false,
  showIcon = true,
  countryCode = '+880',
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
        {showIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiPhone className="h-5 w-5 text-gray-400" />
          </div>
        )}
        {countryCode && (
          <div className={`absolute inset-y-0 ${showIcon ? 'left-10' : 'left-3'} flex items-center pointer-events-none`}>
            <span className="text-gray-500 text-sm">{countryCode}</span>
          </div>
        )}
        <input
          ref={ref}
          type="tel"
          className={`
            w-full rounded-md border-gray-300 shadow-sm 
            focus:border-green-500 focus:ring-green-500
            ${showIcon && countryCode ? 'pl-20' : showIcon ? 'pl-10' : countryCode ? 'pl-12' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          placeholder="1712345678"
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;