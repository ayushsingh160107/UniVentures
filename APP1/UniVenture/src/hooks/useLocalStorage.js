// ========================================
// useLocalStorage.js — Custom hook for persistent state
// Works exactly like useState but saves to localStorage
// ========================================

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Get stored value or use initial
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }, [key, value]);

  return [value, setValue];
}
