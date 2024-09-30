import { ChangeEvent } from 'react';
import { Theme } from '@/app/types';
import s from './Toggle.module.scss';

interface IProps {
  onChangeTheme: (e: ChangeEvent<HTMLInputElement>) => void;
  theme: Theme | undefined;
}

export default function Toggle({ onChangeTheme, theme }: IProps) {
  return (
    <div className={s.wrapper}>
      <p className={s.title}>THEME</p>
      <div className={s.labels}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className={s.toggle}>
        <label className={s.labelEl}>
          <input
            className={s.input}
            type="radio"
            name="theme"
            value="dark"
            onChange={onChangeTheme}
            checked={theme === 'dark'}
          />
          <div className={s.option}></div>
        </label>
        <label className={s.labelEl}>
          <input
            className={s.input}
            type="radio"
            name="theme"
            value="light"
            onChange={onChangeTheme}
            checked={theme === 'light'}
          />
          <div className={s.option}></div>
        </label>
        <label className={s.labelEl}>
          <input
            className={s.input}
            type="radio"
            name="theme"
            value="color"
            onChange={onChangeTheme}
            checked={theme === 'color'}
          />
          <div className={s.option}></div>
        </label>
      </div>
    </div>
  );
}
