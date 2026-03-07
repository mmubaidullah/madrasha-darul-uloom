import { forwardRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchInput = forwardRef(({ 
  label, 
  error, 
  required = false,
  value = '',
  onChange,
  onClear,
  showClearButton = true,
  className = '',
  placeholder = 'অনুসন্ধান করুন...',
  ...props 
}, ref) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
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
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full pl-10 rounded-md border-gray-300 shadow-sm 
            focus:border-green-500 focus:ring-green-500
            ${showClearButton && value ? 'pr-10' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {showClearButton && value && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="h-5 w-5" />
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

SearchInput.displayName = 'SearchInput';

export default SearchInput;