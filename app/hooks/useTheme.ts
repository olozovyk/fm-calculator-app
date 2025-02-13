'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Theme } from '../types';

const getThemeFromLocalStorage = (): Theme | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') as Theme | null;
  }
  return null;
};

const isSystemDefaultThemeDark = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const getCurrentTheme = (): Theme => {
  const themeFromLocalStorage = getThemeFromLocalStorage();

  if (themeFromLocalStorage) {
    return themeFromLocalStorage;
  }

  if (isSystemDefaultThemeDark()) {
    return 'dark';
  }

  return 'light';
};

export default function useTheme(): [
  Theme | undefined,
  Dispatch<SetStateAction<Theme | undefined>>,
] {
  const [theme, setTheme] = useState<Theme | undefined>();

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  useEffect(() => {
    if (!theme) return;

    localStorage.setItem('theme', theme);
    window.document.body.setAttribute('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
