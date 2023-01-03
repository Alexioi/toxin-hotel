const dispatchEvent = (name, properties, nodes) => {
  const eventObject = { detail: properties };

  const customEvent = new CustomEvent(name, eventObject);

  nodes.forEach((node) => {
    node.dispatchEvent(customEvent);
  });
};

export default dispatchEvent;
