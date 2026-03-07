'use client';
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on client side
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        setStoredValue(initialValue);
      } else {
        // Try to parse as JSON, if it fails, use the raw string
        try {
          const value = JSON.parse(item);
          setStoredValue(value);
        } catch (parseError) {
          // If JSON parsing fails, it might be a plain string (like JWT token)
          setStoredValue(item);
        }
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    } finally {
      setIsLoading(false);
    }
  }, [key, initialValue]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        if (valueToStore === null || valueToStore === undefined) {
          window.localStorage.removeItem(key);
        } else {
          // If it's already a string and looks like a token, store as-is
          if (typeof valueToStore === 'string' && (
            valueToStore.startsWith('eyJ') || // JWT token
            valueToStore.startsWith('demo-') || // Demo token
            valueToStore.length > 50 // Long string likely to be a token
          )) {
            window.localStorage.setItem(key, valueToStore);
          } else {
            // Otherwise, JSON stringify
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isLoading];
}