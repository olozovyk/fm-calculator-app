import { ChangeEvent } from 'react';
import Toggle from '../Toggle/Toggle';
import { Theme } from '@/app/types';
import s from './Header.module.scss';

interface IProps {
  onChangeTheme: (e: ChangeEvent<HTMLInputElement>) => void;
  theme: Theme | undefined;
}

export default function Header({ onChangeTheme, theme }: IProps) {
  return (
    <section className={s.header}>
      <h1 className={s.title}>calc</h1>
      <Toggle onChangeTheme={onChangeTheme} theme={theme} />
    </section>
  );
}
