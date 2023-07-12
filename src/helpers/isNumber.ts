const isNumber = (key: string | null): boolean => {
  if (key === null) {
    return false;
  }

  return key.search(/^\d$/) !== -1;
};

export { isNumber };
