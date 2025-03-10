import { OperationTypeExcludeEqual, Key } from '.';

export interface ICalculationState {
  input: Key[];
  tempResult: number;
  resultToShow: string;
  prevOperation: OperationTypeExcludeEqual | null;
}
