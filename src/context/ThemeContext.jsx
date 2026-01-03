/**
 * Theme Context
 *
 * Provides dark/light mode functionality with:
 * - System preference detection
 * - LocalStorage persistence
 * - Smooth theme transitions
 *
 * @author Sakhile Twala
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/** Local storage key for theme preference */
const STORAGE_KEY = 'portfolio-theme';

/** Available themes */
const THEMES = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

/** Theme context */
const ThemeContext = createContext(undefined);

/**
 * ThemeProvider Component
 * Wraps the app and provides theme state and toggle function
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === THEMES.LIGHT || stored === THEMES.DARK) {
        return stored;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return THEMES.LIGHT;
      }
    }
    return THEMES.DARK;
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Only auto-switch if user hasn't manually set preference
      if (!stored) {
        setTheme(e.matches ? THEMES.LIGHT : THEMES.DARK);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle between themes
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, []);

  const value = {
    theme,
    isDark: theme === THEMES.DARK,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme context
 * @returns {{ theme: string, isDark: boolean, toggleTheme: () => void }}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
