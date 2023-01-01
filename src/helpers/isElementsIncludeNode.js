const isElementsIncludeNode = (event, elements) => {
  const initialValue = false;

  return elements.reduce(
    (sum, currentValue) => sum || event.composedPath().includes(currentValue),
    initialValue,
  );
};

export default isElementsIncludeNode;
