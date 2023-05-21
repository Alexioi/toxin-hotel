// @ts-ignore
const dispatchEvent = (name, properties, nodes) => {
  const eventObject = { detail: properties };

  const customEvent = new CustomEvent(name, eventObject);

  // @ts-ignore
  nodes.forEach((node) => {
    node.dispatchEvent(customEvent);
  });
};

export default dispatchEvent;
