//ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const theme = {
    isDarkTheme,
    toggleTheme,
    colors: isDarkTheme
      ? {
          background: '#000',
          text: '#fff',
          inputBg: '#222',
          border: '#444',
          button: '#4444ff',
        }
      : {
          background: '#fff',
          text: '#000',
          inputBg: '#fff',
          border: '#ccc',
          button: '#007bff',
        },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
