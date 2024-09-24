import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useTheme(): [
  'dark' | 'light' | 'color' | undefined,
  Dispatch<SetStateAction<'dark' | 'light' | 'color' | undefined>>,
] {
  const [theme, setTheme] = useState<'dark' | 'light' | 'color'>();

  const getThemeFromLocalStorage = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme && ['dark', 'light', 'color'].includes(localTheme)) {
      setTheme(localTheme as 'dark' | 'light' | 'color');
    }
    return localTheme;
  };

  const getSystemTheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // set initial theme from localStorage or system:
  useEffect(() => {
    const localTheme = getThemeFromLocalStorage();
    if (localTheme) return;
    getSystemTheme();
  }, []);

  // add theme attribute to body element to style it in CSS when theme changed
  useEffect(() => {
    if (!theme) return;

    localStorage.setItem('theme', theme);
    window.document.body.setAttribute('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
