const calculateCounterValue = (value: number, isLiked: boolean): number => {
  const newValue = isLiked ? value + 1 : value - 1;

  return newValue;
};

export { calculateCounterValue };
