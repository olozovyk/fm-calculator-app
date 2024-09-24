import { ChangeEvent } from 'react';
import s from './App.module.scss';
import Header from '../Header/Header';
import Screen from '../Screen/Screen';
import Keypad from '../Keypad/Keypad';
import useTheme from '../../hooks/useTheme';

function App() {
  const [theme, setTheme] = useTheme();

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as 'dark' | 'light' | 'color';
    if (!value) return;
    setTheme(value);
  };

  return (
    <div className={s.container}>
      <Header onThemeChange={onChangeTheme} theme={theme} />
      <Screen />
      <Keypad />
    </div>
  );
}

export default App;
