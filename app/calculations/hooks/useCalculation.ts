import { useState, MouseEvent, useEffect } from 'react';
import { IOperationState, Operation, OperationType } from '@/app/types';
import useInputHandle from './useInputHandle';
import useKeyListener from './useKeyListener';
import { calculate, transformArrayToNumber } from '@/app/utils';

export default function useCalculation() {
  const [calculation, setCalculation] = useState<IOperationState>({
    input: [],
    result: 0,
    prevOperation: null,
    showResult: false,
    resultToShow: '0',
    isEqualMode: false,
    isError: false,
  });

  useInputHandle(calculation, setCalculation);

  const handleDigit = (key: string) => {
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
    if (!calculation.prevOperation && !calculation.input.length) {
      return;
    }

    if (
      calculation.prevOperation === Operation.DIVIDE &&
      Number(calculation.input.join()) === 0
    ) {
      setCalculation((prev) => ({
        ...prev,
        isError: true,
      }));
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
        result: transformArrayToNumber(prev.input),
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
        result: calculate(
          prev.result,
          transformArrayToNumber(prev.input),
          operation,
        ),
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
            transformArrayToNumber(prev.input),
            prev.prevOperation,
          ),
          showResult: true,
        };
      });
      return;
    }
  };

  const handleDel = () => {
    if (calculation.showResult) return;

    setCalculation((prev) => ({
      ...prev,
      input: prev.input.slice(0, prev.input.length - 1),
    }));
  };

  const handleReset = () => {
    setCalculation({
      input: [],
      result: 0,
      showResult: false,
      prevOperation: null,
      resultToShow: '0',
      isEqualMode: false,
      isError: false,
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
    console.log('RESULT:', calculation.result);
    console.log('OPERATION:', calculation.prevOperation);
    console.log('SHOW_RESULT:', calculation.showResult);
    console.log('RESULT_TO_SHOW:', calculation.resultToShow);
    console.log('IS_EQUAL_MODE:', calculation.isEqualMode);
    console.log('IS_ERROR:', calculation.isError);
    console.log('-------------------------');
  }, [
    calculation.input,
    calculation.result,
    calculation.prevOperation,
    calculation.showResult,
    calculation.resultToShow,
    calculation.isEqualMode,
    calculation.isError,
  ]);

  return {
    onKeyClick,
    resultToShow: calculation.resultToShow,
    isError: calculation.isError,
  };
}
