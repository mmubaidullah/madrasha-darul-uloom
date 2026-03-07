'use client';
import { useState, forwardRef } from 'react';
import { FiX } from 'react-icons/fi';

const TagInput = forwardRef(({ 
  label, 
  error, 
  required = false,
  value = [],
  onChange,
  placeholder = 'ট্যাগ যোগ করুন...',
  maxTags,
  className = '',
  ...props 
}, ref) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      if (!maxTags || value.length < maxTags) {
        const newTags = [...value, trimmedValue];
        onChange && onChange(newTags);
        setInputValue('');
      }
    }
  };

  const removeTag = (index) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange && onChange(newTags);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`
        min-h-[2.5rem] w-full rounded-md border border-gray-300 shadow-sm 
        focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500
        ${error ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-500' : ''}
        ${className}
      `}>
        <div className="flex flex-wrap gap-1 p-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                <FiX className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            placeholder={value.length === 0 ? placeholder : ''}
            disabled={maxTags && value.length >= maxTags}
            className="flex-1 min-w-[120px] border-none outline-none focus:ring-0 p-0 text-sm"
            {...props}
          />
        </div>
      </div>
      {maxTags && (
        <p className="text-xs text-gray-500">
          {value.length}/{maxTags} ট্যাগ
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

TagInput.displayName = 'TagInput';

export default TagInput;