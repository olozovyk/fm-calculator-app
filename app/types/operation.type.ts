export const Operation = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTIPLY: 'multiply',
  DIVIDE: 'divide',
  EQUAL: 'equal',
} as const;

export type OperationType = (typeof Operation)[keyof typeof Operation];

export type OperationTypeExcludeEqual = Exclude<
  OperationType,
  (typeof Operation)['EQUAL']
>;
