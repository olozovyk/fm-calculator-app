import { Dispatch, SetStateAction, useEffect } from 'react';
import { ICalculationState, IModeState } from '@/app/types';
import { formatOutput } from '@/app/utils';

interface IParams {
  calculation: ICalculationState;
  setCalculation: Dispatch<SetStateAction<ICalculationState>>;
  mode: IModeState;
  setMode: Dispatch<SetStateAction<IModeState>>;
}

export default function useResultToShowHandle({
  calculation,
  setCalculation,
  mode,
  setMode,
}: IParams) {
  useEffect(() => {
    if (mode.show === 'input' && calculation.input.length === 0) {
      setCalculation((prev) => ({ ...prev, resultToShow: '0' }));
      return;
    }

    if (mode.show === 'result') {
      const result = formatOutput(calculation.tempResult);

      if (result === null) {
        setMode((prev) => ({
          ...prev,
          show: 'error',
        }));
        return;
      }

      setCalculation((prev) => ({ ...prev, resultToShow: result }));
      return;
    }

    const result = formatOutput(Number.parseFloat(calculation.input.join('')));

    if (result === null) {
      setMode((prev) => ({
        ...prev,
        show: 'error',
      }));
      return;
    }

    setCalculation((prev) => ({ ...prev, resultToShow: result }));
  }, [
    calculation.input,
    calculation.tempResult,
    mode.show,
    setCalculation,
    setMode,
  ]);
}
