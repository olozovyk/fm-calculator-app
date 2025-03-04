export const transformArrayToNumber = (arr: string[]) => {
  const n = Number.parseFloat(arr.join(''));

  if (Number.isNaN(n)) {
    throw new Error('Invalid number');
  }

  return n;
};
