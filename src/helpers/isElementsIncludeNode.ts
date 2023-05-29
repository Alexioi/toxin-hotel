const isElementsIncludeNode = (event: Event, elements: (Element | null)[]) => {
  const initialValue = false;

  return elements.reduce((sum, currentValue) => {
    if (currentValue !== null) {
      return sum || event.composedPath().includes(currentValue);
    } else {
      return sum;
    }
  }, initialValue);
};

export default isElementsIncludeNode;
