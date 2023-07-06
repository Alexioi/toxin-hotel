import cssSelectors from '../../constants';
import Counter from './subViews/Counter';
import DropdownEventEmitter from '../../types';

const toggleClearButton = (
  clearButton: Element | null,
  countersValue: number[],
) => {
  if (clearButton === null) {
    return;
  }

  const countersSum = countersValue.reduce((partialSum, counter) => {
    return partialSum + counter;
  }, 0);

  if (countersSum === 0) {
    clearButton.classList.add('dropdown__clear-button_hidden');
  } else {
    clearButton.classList.remove('dropdown__clear-button_hidden');
  }
};

const toggleInputFocus = (node: Element, inputNode: Element | null) => {
  const isOpened = node.classList.contains('dropdown_opened');

  if (isOpened) {
    inputNode?.classList.add('text-field__input_opened');
  } else {
    inputNode?.classList.remove('text-field__input_opened');
  }
};

const closeMenu = (node: Element, inputNode: Element | null) => {
  node.classList.remove('dropdown_opened');
  toggleInputFocus(node, inputNode);
};

const toggleMenu = (node: Element, inputNode: Element | null) => {
  node.classList.toggle('dropdown_opened');
  toggleInputFocus(node, inputNode);
};

const createCounters = (node: Element, eventEmitter: DropdownEventEmitter) => {
  const counterNodes = node.querySelectorAll(cssSelectors.items);

  const counters = [...counterNodes].map((counterNode, index) => {
    return new Counter(counterNode, eventEmitter, index);
  });

  return counters;
};

const updateCounters = (counters: Counter[], counterValues: number[]) => {
  counters.forEach((counter, index) => {
    counter.update(counterValues[index]);
  });
};

export {
  toggleClearButton,
  toggleInputFocus,
  closeMenu,
  toggleMenu,
  createCounters,
  updateCounters,
};
