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
      console.error('localStorage access failed:', e);
    }

    const shouldBeDark = savedTheme === 'dark';
    setDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
    
    console.log('Theme initialized:', {
      savedTheme,
      shouldBeDark,
      htmlClasses: document.documentElement.className
    });
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    
    console.log('Theme toggle:', {
      from: darkMode,
      to: newDarkMode,
      beforeToggle: document.documentElement.className
    });
    
    setDarkMode(newDarkMode);
    applyTheme(newDarkMode);
    
    // Save to localStorage
    try {
      localStorage.setItem('weather-app-theme', newDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.error('localStorage save failed:', e);
    }
    
    console.log('After toggle:', {
      state: newDarkMode,
      htmlClasses: document.documentElement.className
    });
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
