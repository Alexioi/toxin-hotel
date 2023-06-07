const isObjectEqual = (
  obj1: { [key: string]: number },
  obj2: { [key: string]: number },
): boolean => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  /* eslint-disable no-restricted-syntax, guard-for-in */
  for (const key in obj1) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false;
    }

    if (typeof obj1[key] !== typeof obj2[key]) {
      return false;
    }
  }

  return true;
};

export default isObjectEqual;
