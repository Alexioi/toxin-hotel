const isElementsIncludeNode = (event: Event, elements: (Element | null)[]) => {
  const initialValue = false;

  return elements.reduce((acc, el) => {
    if (el !== null) {
      return acc || event.composedPath().includes(el);
    }

    return acc;
  }, initialValue);
};

export { isElementsIncludeNode };
