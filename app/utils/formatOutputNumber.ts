const MAXIMUM_NUMBER_LENGTH = 11;

const formatWithGrouping = (n: number): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 15,
  }).format(n);
};

const getNumberLength = (n: number): number => {
  const [int, float = ''] = String(n).split('.');
  return int.length + float.length;
};

const getIntegerPartLength = (n: number): number => {
  return String(n).split('.')[0].length;
};

const trimFractionalPartInfinite = (n: number): number => {
  return Number.parseFloat(String(n).slice(0, MAXIMUM_NUMBER_LENGTH + 1));
};

export const getFormattedOutput = (n: number): string => {
  const isFinite = Number.isFinite(n);

  if (isFinite && getNumberLength(n) <= MAXIMUM_NUMBER_LENGTH) {
    return formatWithGrouping(n);
  }

  if (getIntegerPartLength(n) < MAXIMUM_NUMBER_LENGTH) {
    return '~' + formatWithGrouping(trimFractionalPartInfinite(n));
  }

  return 'e';
};
