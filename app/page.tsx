'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import useTheme from './hooks/useTheme';
import Header from './components/Header/Header';
import Screen from './components/Screen/Screen';
import Keypad from './components/Keypad/Keypad';
import { Key, Operation, Theme } from './types';
import s from './page.module.scss';

export default function Home() {
  const [theme, setTheme] = useTheme();

  const [input, setInput] = useState<Key[]>([]);
  const [result, setResult] = useState<number>(0);
  const [prevOperation, setPrevOperation] = useState<Operation | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as Theme;
    if (!value) return;
    setTheme(value);
  };

  const onDigitClick = (e: MouseEvent<HTMLButtonElement>) => {
    const keyText = e.currentTarget.textContent;
    setInput((prev) => {
      if (!keyText) {
        return prev;
      }

      setShowResult(false);

      if (keyText === '.' && prev.length === 0) {
        return ['0', '.'];
      }

      if (keyText === '.' && prev.includes('.')) {
        return prev;
      }

      return [...prev, keyText];
    });
  };

  const onDelClick = () => {
    setInput((prev) => {
      return prev.slice(0, prev.length - 1);
    });
  };

  const onResetClick = () => {
    setInput([]);
    setResult(0);
    setShowResult(false);
    setPrevOperation(null);
  };

  const normalizeInput = (arr: string[]) => {
    return arr.join('');
  };

  const handlerOperation = (operation: Operation) => {
    setResult((prev) => {
      if (prevOperation === '+') {
        return prev + Number(normalizeInput(input));
      }
      if (prevOperation === '-') {
        return prev - Number(normalizeInput(input));
      }
      if (prevOperation === 'x') {
        return prev * Number(normalizeInput(input));
      }
      if (prevOperation === '/') {
        return prev / Number(normalizeInput(input));
      }
      if (prevOperation === '=') {
        return prev;
      }
      return Number(normalizeInput(input));
    });
    setShowResult(true);
    setInput([]);
    setPrevOperation(operation);
  };

  const onKeyClick = (e: MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.textContent;

    if (key?.match(/^[\d|\.]$/)) {
      onDigitClick(e);
    }

    if (key?.match(/^[\+\-x\/\=]$/)) {
      handlerOperation(key as Operation);
    }

    if (key === 'DEL') {
      onDelClick();
    }

    if (key === 'RESET') {
      onResetClick();
    }
  };

  const resultToShow = () => {
    if (input.length === 0 && !showResult) {
      return 0;
    }
    if (showResult) {
      return result;
    }
    return Number(input.join(''));
  };

  return (
    theme && (
      <div className={s.container}>
        <Header onChangeTheme={onChangeTheme} theme={theme} />
        <Screen value={resultToShow()} />
        <Keypad onKeyClick={onKeyClick} />
      </div>
    )
  );
}
