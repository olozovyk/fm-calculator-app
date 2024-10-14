'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import useTheme from './hooks/useTheme';
import Header from './components/Header/Header';
import Screen from './components/Screen/Screen';
import Keypad from './components/Keypad/Keypad';
import { Key, Operation, OperationType, Theme } from './types';
import s from './page.module.scss';
import { calculate } from './utils';

export default function Home() {
  const [theme, setTheme] = useTheme();

  const [input, setInput] = useState<Key[]>([]);
  const [result, setResult] = useState<number>(0);
  const [prevOperation, setPrevOperation] = useState<OperationType | null>(
    null,
  );
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

  const handleOperation = (operation: OperationType) => {
    setResult((prev) => {
      if (prevOperation === Operation.ADD) {
        return calculate(prev, Number(normalizeInput(input)), Operation.ADD);
      }
      if (prevOperation === Operation.SUBTRACT) {
        return calculate(
          prev,
          Number(normalizeInput(input)),
          Operation.SUBTRACT,
        );
      }
      if (prevOperation === Operation.MULTIPLY) {
        return calculate(
          prev,
          Number(normalizeInput(input)),
          Operation.MULTIPLY,
        );
      }
      if (prevOperation === Operation.DIVIDE) {
        return calculate(prev, Number(normalizeInput(input)), Operation.DIVIDE);
      }
      if (prevOperation === Operation.EQUAL) {
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

    if (key === '+') {
      handleOperation(Operation.ADD);
    }

    if (key === '-') {
      handleOperation(Operation.SUBTRACT);
    }

    if (key === 'x') {
      handleOperation(Operation.MULTIPLY);
    }

    if (key === '/') {
      handleOperation(Operation.DIVIDE);
    }

    if (key === '=') {
      handleOperation(Operation.EQUAL);
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
