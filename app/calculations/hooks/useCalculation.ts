import { useState, MouseEvent, useEffect } from 'react';
import {
  ICalculationState,
  IModeState,
  Operation,
  OperationType,
} from '@/app/types';
import useInputHandle from './useInputHandle';
import useKeyListener from './useKeyListener';
import { calculate, transformArrayToNumber } from '@/app/utils';

export default function useCalculation() {
  const [calculation, setCalculation] = useState<ICalculationState>({
    input: [],
    tempResult: 0,
    prevOperation: null,
    resultToShow: '0',
  });

  const [mode, setMode] = useState<IModeState>({
    show: 'input',
    justPressedEqual: false,
    afterEqual: false,
  });

  useInputHandle({ calculation, setCalculation, mode, setMode });

  const handleDigit = (key: string) => {
    if (mode.show === 'result') {
      setMode((prev) => ({
        ...prev,
        show: 'input',
      }));

      setCalculation((prev) => ({
        ...prev,
        input: [],
      }));
    }

    if (mode.justPressedEqual) {
      setMode((prev) => ({
        ...prev,
        afterEqual: false,
        justPressedEqual: false,
      }));

      setCalculation((prev) => ({
        ...prev,
        tempResult: 0,
        prevOperation: null,
      }));
    }

    if (mode.afterEqual) {
      setMode((prev) => ({
        ...prev,
        afterEqual: false,
      }));
    }

    setCalculation((prev) => {
      if (prev.input.length >= 11 || !key) {
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

  const handleOperation = (operation: OperationType) => {
    if (mode.justPressedEqual && operation !== Operation.EQUAL) {
      setMode((prev) => ({
        ...prev,
        justPressedEqual: false,
      }));
    }

    // Change operation if operation already exists
    if (
      mode.show === 'result' &&
      calculation.prevOperation &&
      operation !== Operation.EQUAL
    ) {
      setCalculation((prev) => ({
        ...prev,
        prevOperation: operation,
      }));
      return;
    }

    if (calculation.input.length === 0) {
      return;
    }

    // Divide to 0
    if (
      calculation.prevOperation === Operation.DIVIDE &&
      Number(calculation.input.join()) === 0
    ) {
      setMode((prev) => ({
        ...prev,
        show: 'error',
      }));
      return;
    }

    // Equal mode
    if (mode.afterEqual && operation !== Operation.EQUAL) {
      setMode((prev) => ({
        ...prev,
        afterEqual: false,
      }));

      setCalculation((prev) => ({
        ...prev,
        prevOperation: operation,
        input: [],
      }));
      return;
    }

    if (
      operation !== Operation.EQUAL &&
      !calculation.prevOperation &&
      calculation.input
    ) {
      setMode((prev) => ({
        ...prev,
        show: 'result',
      }));

      setCalculation((prev) => ({
        ...prev,
        input: [],
        tempResult: transformArrayToNumber(prev.input),
        prevOperation: operation,
      }));
      return;
    }

    if (mode.show === 'result' && operation !== Operation.EQUAL) {
      setCalculation((prev) => ({
        ...prev,
        prevOperation: operation,
      }));
    }

    if (operation !== Operation.EQUAL) {
      setMode((prev) => ({
        ...prev,
        show: 'result',
      }));

      setCalculation((prev) => {
        if (!prev.prevOperation) {
          return { ...prev, prevOperation: operation };
        }
        return {
          ...prev,
          tempResult: calculate(
            prev.tempResult,
            transformArrayToNumber(prev.input),
            prev.prevOperation,
          ),
          prevOperation: operation,
        };
      });
      return;
    }

    if (operation === Operation.EQUAL) {
      setMode((prev) => ({
        ...prev,
        show: 'result',
        afterEqual: true,
        justPressedEqual: true,
      }));

      setCalculation((prev) => {
        if (!prev.prevOperation) {
          return { ...prev };
        }
        return {
          ...prev,
          tempResult: calculate(
            prev.tempResult,
            transformArrayToNumber(prev.input),
            prev.prevOperation,
          ),
        };
      });
      return;
    }
  };

  const handleDel = () => {
    if (mode.show === 'result') return;

    setCalculation((prev) => ({
      ...prev,
      input: prev.input.slice(0, prev.input.length - 1),
    }));
  };

  const handleReset = () => {
    setMode((prev) => ({
      ...prev,
      show: 'input',
      afterEqual: true,
      justPressedEqual: false,
    }));

    setCalculation({
      input: [],
      tempResult: 0,
      prevOperation: null,
      resultToShow: '0',
    });
  };

  const onKeyClick = (e: MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.textContent;

    if (key?.match(/^[\d|.]$/) && key) {
      handleDigit(key);
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
      handleDel();
    }

    if (key === 'RESET') {
      handleReset();
    }
  };

  useKeyListener({ handleDigit, handleDel, handleReset, handleOperation });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    console.log('INPUT:', calculation.input);
    console.log('RESULT:', calculation.tempResult);
    console.log('PREV_OPERATION:', calculation.prevOperation);
    console.log('RESULT_TO_SHOW:', calculation.resultToShow);
    console.log('MODE:', mode.show);
    console.log('AFTER_EQUAL:', mode.afterEqual);
    console.log('JUST_EQUAL_PRESSED:', mode.justPressedEqual);
    console.log('-------------------------');
  }, [
    calculation.input,
    calculation.tempResult,
    calculation.prevOperation,
    calculation.resultToShow,
    mode.show,
    mode.afterEqual,
    mode.justPressedEqual,
  ]);

  return {
    onKeyClick,
    resultToShow: calculation.resultToShow,
    isError: mode.show === 'error',
  };
}
