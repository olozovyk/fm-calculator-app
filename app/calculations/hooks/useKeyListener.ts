import { useEffect } from 'react';
import { Operation, OperationType } from '@/app/types';

interface IParams {
  handleDigit(key: string): void;
  handleOperation(operation: OperationType): void;
  handleDel(): void;
  handleReset(): void;
}

export default function useKeyListener({
  handleDigit,
  handleOperation,
  handleDel,
  handleReset,
}: IParams) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.match(/^[\d|.,]$/)) {
        handleDigit(e.key);
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
        handleDel();
      }

      if (e.key === 'Delete') {
        handleReset();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });
}
