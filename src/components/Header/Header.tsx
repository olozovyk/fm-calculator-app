import { ChangeEvent } from 'react';
import Toggle from '../Toggle/Toggle';
import s from './Header.module.scss';

interface IProps {
  onThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  theme: 'dark' | 'light' | 'color' | undefined;
}

export default function Header({ onThemeChange, theme }: IProps) {
  return (
    <section className={s.header}>
      <h1 className={s.title}>calc</h1>
      <Toggle onThemeChange={onThemeChange} theme={theme} />
    </section>
  );
}
