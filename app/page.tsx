'use client';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import useTheme from './hooks/useTheme';
import Header from './components/Header/Header';
import Screen from './components/Screen/Screen';
import Keypad from './components/Keypad/Keypad';
import { calculate, getFormattedOutput } from './utils';
import {
  Key,
  Operation,
  OperationType,
  OperationTypeExcludeEqual,
  Theme,
} from './types';
import s from './page.module.scss';

interface IOperationState {
  input: Key[];
  result: number;
  prevOperation: OperationTypeExcludeEqual | null;
  showResult: boolean;
  isEqualMode: boolean;
}

export default function Home() {
  const [theme, setTheme] = useTheme();

  const [calculation, setCalculation] = useState<IOperationState>({
    input: [],
    result: 0,
    prevOperation: null,
    showResult: false,
    isEqualMode: false,
  });

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as Theme;
    if (!value) return;
    setTheme(value);
  };

  const onDigitClick = (key: string) => {
    if (calculation.showResult) {
      setCalculation((prev) => ({
        ...prev,
        input: [],
        showResult: false,
      }));
    }

    if (calculation.isEqualMode) {
      setCalculation((prev) => ({
        ...prev,
        result: 0,
        isEqualMode: false,
        prevOperation: null,
      }));
    }

    setCalculation((prev) => {
      if (prev.input.length >= 13 || !key) {
        return { ...prev };
      }

      if ((key === '.' || key === ',') && prev.input.length === 0) {
        return {
          ...prev,
          input: ['0', '.'],
        };
      }

      if ((key === '.' || key === ',') && prev.input.includes('.')) {
        return { ...prev };
      }

      return {
        ...prev,
        input: key === ',' ? [...prev.input, '.'] : [...prev.input, key],
      };
    });
  };

  const normalizeInput = (arr: string[]): number => {
    return Number(arr.join(''));
  };

  const handleOperation = (operation: OperationType) => {
    if (!calculation.prevOperation && !calculation.input.length) {
      return;
    }

    if (
      calculation.prevOperation === Operation.DIVIDE &&
      Number(calculation.input.join()) === 0
    ) {
      // TODO: Error
      console.log('Error');
      return;
    }

    if (operation !== Operation.EQUAL && calculation.isEqualMode) {
      setCalculation((prev) => ({
        ...prev,
        isEqualMode: false,
        input: [],
        prevOperation: operation,
      }));
      return;
    }

    if (
      operation !== Operation.EQUAL &&
      !calculation.prevOperation &&
      calculation.input
    ) {
      setCalculation((prev) => ({
        ...prev,
        result: normalizeInput(prev.input),
        showResult: true,
        prevOperation: operation,
      }));
      return;
    }

    if (operation !== Operation.EQUAL && calculation.showResult) {
      setCalculation((prev) => ({
        ...prev,
        prevOperation: operation,
      }));
      return;
    }

    if (operation !== Operation.EQUAL) {
      setCalculation((prev) => ({
        ...prev,
        result: calculate(prev.result, normalizeInput(prev.input), operation),
        showResult: true,
        prevOperation: operation,
      }));
      return;
    }

    if (operation === Operation.EQUAL) {
      setCalculation((prev) => {
        if (!prev.prevOperation) {
          return { ...prev };
        }
        return {
          ...prev,
          isEqualMode: true,
          result: calculate(
            prev.result,
            normalizeInput(prev.input),
            prev.prevOperation,
          ),
          showResult: true,
        };
      });
      return;
    }
  };

  const onDelClick = () => {
    if (calculation.showResult) return;

    setCalculation((prev) => ({
      ...prev,
      input: prev.input.slice(0, prev.input.length - 1),
    }));
  };

  const onResetClick = () => {
    setCalculation({
      input: [],
      result: 0,
      showResult: false,
      prevOperation: null,
      isEqualMode: false,
    });
  };

  const onKeyClick = (e: MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.textContent;

    if (key?.match(/^[\d|\.]$/) && key) {
      onDigitClick(key);
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.match(/^[\d|\.\,]$/)) {
        onDigitClick(e.key);
      }

      if (e.key === '+') {
        handleOperation(Operation.ADD);
      }

      if (e.key === '-') {
        handleOperation(Operation.SUBTRACT);
      }

      if (e.key === '*') {
        handleOperation(Operation.MULTIPLY);
      }

      if (e.key === '/') {
        handleOperation(Operation.DIVIDE);
      }

      if (e.key === '=' || e.key === 'Enter') {
        handleOperation(Operation.EQUAL);
      }

      if (e.key === 'Backspace') {
        onDelClick();
      }

      if (e.key === 'Delete') {
        onResetClick();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  const resultToShow = (): string => {
    if (calculation.input.length === 0 && !calculation.showResult) {
      return '0';
    }

    if (calculation.showResult) {
      return getFormattedOutput(calculation.result);
    }

    return getFormattedOutput(Number.parseFloat(calculation.input.join('')));
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    console.log('INPUT:', calculation.input);
    console.log('RESULT:', calculation.result);
    console.log('OPERATION:', calculation.prevOperation);
    console.log('SHOW_RESULT:', calculation.showResult);
    console.log('IS_EQUAL_MODE:', calculation.isEqualMode);
    console.log('-------------------------');
  }, [
    calculation.input,
    calculation.result,
    calculation.prevOperation,
    calculation.showResult,
    calculation.isEqualMode,
  ]);

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
