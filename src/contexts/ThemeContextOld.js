'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false); // Default to light mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved preference from localStorage
    const savedTheme = localStorage.getItem('weather-app-theme');
    console.log('Initial load - savedTheme:', savedTheme);
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      console.log('Set to dark mode on load');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      console.log('Set to light mode on load');
    }
    console.log('HTML classes after load:', document.documentElement.classList.toString());
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    console.log('Toggle called:', { current: darkMode, new: newDarkMode });
    setDarkMode(newDarkMode);
    
    // Update DOM immediately
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('weather-app-theme', 'dark');
      console.log('Added dark class, classes:', document.documentElement.classList.toString());
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('weather-app-theme', 'light');
      console.log('Removed dark class, classes:', document.documentElement.classList.toString());
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
