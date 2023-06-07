const isArrayWithNumbers = (value: any[]): value is number[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'number')
  );
};

const isArrayOfStringArrays = (value: any): value is string[][] => {
  if (!Array.isArray(value)) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const arr of value) {
    if (!Array.isArray(arr)) return false;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of arr) {
      if (typeof item !== 'string') return false;
    }
  }

  return true;
};

const getIndex = (isUnit: boolean, isPair: boolean): 0 | 1 | 2 => {
  if (isUnit) {
    return 0;
  }

  if (isPair) {
    return 1;
  }

  return 2;
};

const getPlural = (forms: string[], count: number) => {
  const c10 = count % 10;
  const c100 = count % 100;
  const isUnit = c10 === 1 && c100 !== 11;
  const isPair = c10 >= 2 && c10 <= 4 && (c100 < 10 || c100 >= 20);
  const idx = getIndex(isUnit, isPair);

  return forms[idx] || '';
};

const calculateValues = (
  variants: string[][],
  counters: number[],
  placeholder: string,
) => {
  const value = [];

  variants.forEach((variant, index) => {
    const count = counters[index];

    if (count > 0) {
      value.push(`${count} ${getPlural(variant, count)}`);
    }
  });

  if (value.length === 0) {
    value.push(placeholder);
  }

  return value;
};

const calculateValue = (
  groups: number[][],
  countersValue: number[],
  variants: string[][],
  placeholder: string,
) => {
  const counters = groups.map((group) => {
    const initialValue = 0;

    return group.reduce(
      (sum: number, index: number) => sum + countersValue[index],
      initialValue,
    );
  });

  const value = calculateValues(variants, counters, placeholder);

  return value.join(', ');
};

export { calculateValue, isArrayOfStringArrays, isArrayWithNumbers };
