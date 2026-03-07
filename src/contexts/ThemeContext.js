'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [primaryColor, setPrimaryColor] = useLocalStorage('primary_color', '#059669');

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply primary color as CSS variable
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [theme, primaryColor]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
  };

  const value = {
    theme,
    primaryColor,
    setTheme,
    toggleTheme,
    updatePrimaryColor,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}