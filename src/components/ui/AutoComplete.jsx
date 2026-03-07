'use client';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

const AutoComplete = forwardRef(({ 
  label, 
  error, 
  required = false,
  value = '',
  onChange,
  options = [],
  placeholder = 'টাইপ করুন...',
  noOptionsText = 'কোনো অপশন পাওয়া যায়নি',
  clearable = true,
  className = '',
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange && onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    onChange && onChange(option.label);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleClear = () => {
    onChange && onChange('');
    inputRef.current?.focus();
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
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={`
              w-full rounded-md border-gray-300 shadow-sm 
              focus:border-green-500 focus:ring-green-500
              ${clearable && value ? 'pr-16' : 'pr-8'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            {clearable && value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <FiChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                {noOptionsText}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    index === highlightedIndex
                      ? 'bg-green-100 text-green-900'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;