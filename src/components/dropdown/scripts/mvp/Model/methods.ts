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

const calculateValue = (
  groups: number[][],
  countersValue: number[],
  variants: string[][],
  placeholder: string,
) => {
  const counters = groups.map((group) => {
    const initialValue = 0;

    return group.reduce((sum: number, index: number) => {
      return sum + countersValue[index];
    }, initialValue);
  });

  const value = variants.reduce((accumulator, variant, index) => {
    const count = counters[index];
    const item = `${count} ${getPlural(variant, count)}`;

    if (count === 0) {
      return accumulator;
    }

    if (accumulator === '') {
      return item;
    }

    return `${accumulator}, ${item}`;
  }, '');

  if (value === '') {
    return placeholder;
  }

  return value;
};

const calculateCounter = (
  counters: number[],
  index: number,
  argument: number,
) => {
  return counters.map((counter, i) => {
    if (i !== index) {
      return counter;
    }

    const newCounters = counter + argument;

    if (newCounters < 0) {
      return 0;
    }

    return newCounters;
  });
};

const resetCounters = (counters: number[]) => {
  return counters.map(() => {
    return 0;
  });
};

export { calculateValue, calculateCounter, resetCounters };
