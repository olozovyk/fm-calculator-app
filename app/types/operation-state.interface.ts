import { OperationTypeExcludeEqual, Key } from '.';

export interface IOperationState {
  input: Key[];
  result: number;
  prevOperation: OperationTypeExcludeEqual | null;
  showResult: boolean;
  resultToShow: string;
  isEqualMode: boolean;
  isError: boolean;
}
