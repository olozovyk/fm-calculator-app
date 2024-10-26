import { ChangeEvent, useEffect, useRef } from 'react';
import useFocusVisible from '@/app/hooks/useFocusVisible';
import { Theme } from '@/app/types';
import s from './Toggle.module.scss';

interface ToggleProps {
  theme: Theme;
  onChangeTheme: (e: ChangeEvent<HTMLInputElement>) => void;
}

const themes = ['dark', 'light', 'color'];

export default function Toggle({ theme, onChangeTheme }: ToggleProps) {
  const circleRef = useRef<HTMLDivElement>(null);

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
      <div className={s.markers}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className={s.toggle}>
        <div className={s.inputs}>
          {themes.map((item, idx) => {
            return (
              <label key={idx}>
                <input
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
        </div>

        <div className={s.optionFrame}>
          <div className={s.option} ref={circleRef}></div>
        </div>
      </div>
    </div>
  );
}
