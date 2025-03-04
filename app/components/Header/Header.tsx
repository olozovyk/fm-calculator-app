import Toggle from '../Toggle/Toggle';
import s from './Header.module.scss';

export default function Header() {
  return (
    <header className={s.header}>
      <h1 className={s.title}>calc</h1>
      <Toggle />
    </header>
  );
}
