'use client';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import useTheme from './hooks/useTheme';
import Header from './components/Header/Header';
import Screen from './components/Screen/Screen';
import Keypad from './components/Keypad/Keypad';
import { calculate } from './utils';
import {
  Key,
  Operation,
  OperationType,
  OperationTypeExcludeEqual,
  Theme,
} from './types';
import s from './page.module.scss';

export default function Home() {
  const [theme, setTheme] = useTheme();

  const [input, setInput] = useState<Key[]>([]);
  const [result, setResult] = useState<number>(0);
  const [prevOperation, setPrevOperation] =
    useState<OperationTypeExcludeEqual | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isEqualMode, setIsEqualMode] = useState<boolean>(false);

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as Theme;
    if (!value) return;
    setTheme(value);
  };

  const onDigitClick = (e: MouseEvent<HTMLButtonElement>) => {
    const keyText = e.currentTarget.textContent;

    if (showResult) {
      setInput([]);
      setShowResult(false);
    }

    if (isEqualMode) {
      setResult(0);
      setIsEqualMode(false);
      setPrevOperation(null);
    }

    setInput((prev) => {
      if (input.length >= 13 || !keyText) {
        return prev;
      }

      if (keyText === '.' && prev.length === 0) {
        return ['0', '.'];
      }

      if (keyText === '.' && prev.includes('.')) {
        return prev;
      }

      return [...prev, keyText];
    });
  };

  const normalizeInput = (arr: string[]): number => {
    return Number(arr.join(''));
  };

  const handleOperation = (operation: OperationType) => {
    if (!prevOperation && !input.length) {
      return;
    }

    if (isEqualMode && operation !== Operation.EQUAL) {
      setIsEqualMode(false);
      setInput([]);
      setPrevOperation(operation);
      return;
    }

    if (operation !== Operation.EQUAL) {
      if (!prevOperation && input) {
        setResult(normalizeInput(input));
        setShowResult(true);
        setPrevOperation(operation);
        return;
      }

      setResult((prev) => calculate(prev, normalizeInput(input), operation));
      setShowResult(true);
      setPrevOperation(operation);
      return;
    }

    if (operation === Operation.EQUAL) {
      if (!prevOperation) return;

      setIsEqualMode(true);
      setResult((prev) =>
        calculate(prev, normalizeInput(input), prevOperation),
      );
      setShowResult(true);
      return;
    }
  };

  const onDelClick = () => {
    if (showResult) return;

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

  useEffect(() => {
    console.log('INPUT:', input);
    console.log('RESULT:', result);
    console.log('OPERATION:', prevOperation);
    console.log('SHOW_RESULT:', showResult);
    console.log('IS_EQUAL_MODE:', isEqualMode);
    console.log('-------------------------');
  }, [input, result, prevOperation, showResult, isEqualMode]);

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
