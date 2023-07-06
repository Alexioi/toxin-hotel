import EventEmitter from '@helpers/EventEmitter';

import Model from './mvp/Model';
import View from './mvp/View';
import Presenter from './mvp/Presenter';
import DropdownEventEmitter from './types';

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
    const eventEmitter: DropdownEventEmitter = new EventEmitter();

    const groups = getData(node, 'groups');
    const variants = getData(node, 'variants');
    const placeholder = getData(node, 'placeholder');
    const counters = getData(node, 'counters');

    const model = new Model(
      eventEmitter,
      groups,
      variants,
      placeholder,
      counters,
    );
    const view = new View(node, eventEmitter);
    new Presenter(view, model, eventEmitter);
  }
}

export default Dropdown;
