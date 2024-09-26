import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Theme } from '../types';

const getThemeFromLocalStorage = (): Theme | null => {
  return localStorage.getItem('theme') as Theme | null;
};

const isSystemDefaultThemeDark = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getCurrentTheme = (): Theme => {
  return (
    getThemeFromLocalStorage() ||
    (isSystemDefaultThemeDark() && 'dark') ||
    'light'
  );
};

export default function useTheme(): [Theme, Dispatch<SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(() => getCurrentTheme());

  useEffect(() => {
    if (!theme) return;

    localStorage.setItem('theme', theme);
    window.document.body.setAttribute('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
