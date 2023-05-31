const isObjectEqual = (
  obj1: { [key: string]: number },
  obj2: { [key: string]: number },
): boolean => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (!obj2.hasOwnProperty(key)) {
        return false;
      }

      if (typeof obj1[key] !== typeof obj2[key]) {
        return false;
      }
    }
  }

  return true;
};

export default isObjectEqual;
