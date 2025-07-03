'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Function to apply theme immediately
  const applyTheme = (isDark) => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage for saved theme
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('weather-app-theme');
    } catch (e) {
      // localStorage access failed - use default
    }

    const shouldBeDark = savedTheme === 'dark';
    setDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    
    setDarkMode(newDarkMode);
    applyTheme(newDarkMode);
    
    // Force a repaint to ensure styles are applied
    document.body.style.display = 'none';
    document.body.offsetHeight; // trigger reflow
    document.body.style.display = '';
    
    // Save to localStorage
    try {
      localStorage.setItem('weather-app-theme', newDarkMode ? 'dark' : 'light');
    } catch (e) {
      // localStorage save failed - continue anyway
    }
  };

  const value = {
    darkMode,
    toggleDarkMode,
    mounted
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
