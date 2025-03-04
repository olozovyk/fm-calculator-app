import { Dispatch, SetStateAction, useEffect } from 'react';
import { IOperationState } from '@/app/types';
import { formatOutput } from '@/app/utils';

export default function useInputHandle(
  calculation: IOperationState,
  setCalculation: Dispatch<SetStateAction<IOperationState>>,
) {
  useEffect(() => {
    if (calculation.input.length === 0 && !calculation.showResult) {
      setCalculation((prev) => ({ ...prev, resultToShow: '0' }));
      return;
    }

    if (calculation.showResult) {
      const result = formatOutput(calculation.result);
      if (result === null) {
        setCalculation((prev) => ({ ...prev, isError: true }));
        return;
      }

      setCalculation((prev) => ({ ...prev, resultToShow: result }));
      return;
    }

    const result = formatOutput(Number.parseFloat(calculation.input.join('')));

    if (result === null) {
      setCalculation((prev) => ({ ...prev, isError: true }));
      return;
    }

    setCalculation((prev) => ({ ...prev, resultToShow: result }));
  }, [
    calculation.input,
    calculation.result,
    calculation.showResult,
    setCalculation,
  ]);
}
