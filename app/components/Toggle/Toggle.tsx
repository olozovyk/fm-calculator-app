import { ChangeEvent, useEffect, useRef } from 'react';
import useFocusVisible from '@/app/hooks/useFocusVisible';
import useTheme from '@/app/hooks/useTheme';
import { Theme } from '@/app/types';
import s from './Toggle.module.scss';

const themes = ['dark', 'light', 'color'];

export default function Toggle() {
  const [theme, setTheme] = useTheme();

  const circleRef = useRef<HTMLDivElement>(null);

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as Theme;
    if (!value) return;
    setTheme(value);
  };

  const isFocusVisible = useFocusVisible();

  useEffect(() => {
    if (!circleRef.current) return;

    if (theme === 'dark') {
      circleRef.current.style.transform = 'translateX(0)';
    }

    if (theme === 'light') {
      circleRef.current.style.transform = 'translateX(23px)';
    }

    if (theme === 'color') {
      circleRef.current.style.transform = 'translateX(45px)';
    }
  }, [theme]);

  const onFocusInput = () => {
    if (isFocusVisible) {
      circleRef.current?.classList.add(s.active);
    }
  };

  const onBlurInput = () => {
    circleRef.current?.classList.remove(s.active);
  };

  return (
    <div className={s.wrapper}>
      <p className={s.title}>THEME</p>
      <div className={s.markers}>123</div>
      <div className={s.toggle}>
        {themes.map((item, idx) => {
          return (
            <label className={s.label} key={idx}>
              <input
                className={s.input}
                type="radio"
                name="theme"
                value={item}
                checked={theme === item}
                onChange={onChangeTheme}
                onFocus={onFocusInput}
                onBlur={onBlurInput}
              />
            </label>
          );
        })}

        <div className={s.option} ref={circleRef}></div>
      </div>
    </div>
  );
}
