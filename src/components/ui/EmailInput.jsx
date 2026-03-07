import { forwardRef } from 'react';
import { FiMail } from 'react-icons/fi';

const EmailInput = forwardRef(({ 
  label, 
  error, 
  required = false,
  showIcon = true,
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
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          type="email"
          className={`
            w-full rounded-md border-gray-300 shadow-sm 
            focus:border-green-500 focus:ring-green-500
            ${showIcon ? 'pl-10' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

EmailInput.displayName = 'EmailInput';

export default EmailInput;