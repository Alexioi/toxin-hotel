import { Model, View, Presenter } from './mvp';

const getData = (node: Element, name: string) => {
  if (!(node instanceof HTMLElement)) {
    return undefined;
  }

  const dataset = node.dataset[name];

  if (typeof dataset === 'string') {
    try {
      return JSON.parse(dataset);
    } catch (error) {
      return dataset;
    }
  }

  return undefined;
};

class Dropdown {
  constructor(node: Element) {
    const groups = getData(node, 'groups');
    const variants = getData(node, 'variants');
    const placeholder = getData(node, 'placeholder');
    const counters = getData(node, 'counters');

    const model = new Model(groups, variants, placeholder, counters);
    const view = new View(node);
    new Presenter(view, model);
  }
}

export { Dropdown };
