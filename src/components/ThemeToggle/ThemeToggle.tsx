import Toggle from '../Toggle/Toggle';
import s from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  return (
    <div className={s.wrapper}>
      <p>THEME</p>
      <Toggle />
    </div>
  );
}
