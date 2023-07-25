const isElementsIncludeNode = (event: Event, elements: (Element | null)[]) => {
  const initialValue = false;

  return elements.reduce((acc, element) => {
    if (element !== null) {
      return acc || event.composedPath().includes(element);
    }

    return acc;
  }, initialValue);
};

export { isElementsIncludeNode };
