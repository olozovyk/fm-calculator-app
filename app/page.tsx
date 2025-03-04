'use client';

import Header from './components/Header/Header';
import Screen from './components/Screen/Screen';
import Keypad from './components/Keypad/Keypad';
import useTheme from './hooks/useTheme';
import useCalculation from './calculations/hooks/useCalculation';
import s from './page.module.scss';

export default function Home() {
  const [theme] = useTheme();
  const { onKeyClick, resultToShow, isError } = useCalculation();

  return (
    theme && (
      <div className={s.container}>
        <Header />
        <Screen value={isError ? 'e' : resultToShow} />
        <Keypad onKeyClick={onKeyClick} />
      </div>
    )
  );
}
