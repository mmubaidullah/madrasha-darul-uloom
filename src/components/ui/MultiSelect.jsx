'use client';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { FiChevronDown, FiX, FiCheck } from 'react-icons/fi';

const MultiSelect = forwardRef(({ 
  label, 
  error, 
  required = false,
  value = [],
  onChange,
  options = [],
  placeholder = 'নির্বাচন করুন...',
  noOptionsText = 'কোনো অপশন পাওয়া যায়নি',
  maxSelections,
  searchable = true,
  className = '',
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionToggle = (option) => {
    const isSelected = value.some(item => item.value === option.value);
    
    if (isSelected) {
      const newValue = value.filter(item => item.value !== option.value);
      onChange && onChange(newValue);
    } else {
      if (!maxSelections || value.length < maxSelections) {
        const newValue = [...value, option];
        onChange && onChange(newValue);
      }
    }
  };

  const handleRemoveItem = (optionToRemove) => {
    const newValue = value.filter(item => item.value !== optionToRemove.value);
    onChange && onChange(newValue);
  };

  const isSelected = (option) => {
    return value.some(item => item.value === option.value);
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return value[0].label;
    return `${value.length}টি নির্বাচিত`;
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative" ref={containerRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm cursor-pointer
            focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
        >
          <div className="flex flex-wrap gap-1">
            {value.length > 0 ? (
              value.map((item) => (
                <span
                  key={item.value}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800"
                >
                  {item.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item);
                    }}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-hidden focus:outline-none">
            {searchable && (
              <div className="px-3 py-2 border-b border-gray-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="অনুসন্ধান করুন..."
                  className="w-full border-none outline-none focus:ring-0 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className="max-h-48 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  {noOptionsText}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const selected = isSelected(option);
                  const disabled = maxSelections && !selected && value.length >= maxSelections;
                  
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => !disabled && handleOptionToggle(option)}
                      disabled={disabled}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                        selected
                          ? 'bg-green-100 text-green-900'
                          : disabled
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span>{option.label}</span>
                      {selected && <FiCheck className="h-4 w-4 text-green-600" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
      {maxSelections && (
        <p className="text-xs text-gray-500">
          {value.length}/{maxSelections} নির্বাচিত
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;