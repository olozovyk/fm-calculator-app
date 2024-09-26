import { ChangeEvent } from 'react';
import Toggle from '../Toggle/Toggle';
import s from './Header.module.scss';
import { Theme } from '../../types';

interface IProps {
  onThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  theme: Theme;
}

export default function Header({ onThemeChange, theme }: IProps) {
  return (
    <section className={s.header}>
      <h1 className={s.title}>calc</h1>
      <Toggle onThemeChange={onThemeChange} theme={theme} />
    </section>
  );
}
