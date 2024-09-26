import { ChangeEvent } from 'react';
import s from './Toggle.module.scss';
import { Theme } from '../../types';

interface IProps {
  onThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  theme: Theme;
}

export default function Toggle({ onThemeChange, theme }: IProps) {
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
            onChange={onThemeChange}
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
            onChange={onThemeChange}
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
            onChange={onThemeChange}
            checked={theme === 'color'}
          />
          <div className={s.option}></div>
        </label>
      </div>
    </div>
  );
}
