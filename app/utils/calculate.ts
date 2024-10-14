import Big from 'big.js';
import { Operation, OperationTypeExcludeEqual } from '../types';

export const calculate = (
  x: number,
  y: number,
  operation: OperationTypeExcludeEqual,
) => {
  const operations: Record<OperationTypeExcludeEqual, Big.Big> = {
    [Operation.ADD]: Big(x).plus(Big(y)),
    [Operation.SUBTRACT]: Big(x).minus(Big(y)),
    [Operation.MULTIPLY]: Big(x).times(Big(y)),
    [Operation.DIVIDE]: Big(x).div(Big(y)),
  };

  const result = operations[operation];

  if (!result) {
    throw new Error(`The operation ${operation} is not supported`);
  }

  return result.toNumber();
};
