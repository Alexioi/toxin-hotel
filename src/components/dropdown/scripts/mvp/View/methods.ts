import { helpers } from '@helpers';
import { cssSelectors } from '../../constants';
import { Counter } from './subViews/Counter';
import { Dom, Props } from './type';

const initNodes = (root: Element) => {
  const input = root.querySelector(cssSelectors.input);
  const inputButton = root.querySelector(cssSelectors.inputButton);
  const textField = root.querySelector(cssSelectors.textField);
  const clearButton = root.querySelector(cssSelectors.clearButton);
  const applyButton = root.querySelector(cssSelectors.applyButton);
  const menu = root.querySelector(cssSelectors.menu);

  if (input === null) {
    throw new helpers.SearchElementError('dropdown input equal null');
  }

  if (inputButton === null) {
    throw new helpers.SearchElementError('dropdown input button equal null');
  }

  if (textField === null) {
    throw new helpers.SearchElementError('dropdown text field equal null');
  }

  if (menu === null) {
    throw new helpers.SearchElementError('dropdown menu equal null');
  }

  return {
    root,
    input,
    inputButton,
    textField,
    clearButton,
    applyButton,
    menu,
  };
};

const initProps = ({ root, applyButton }: Dom): Props => {
  const isOpened = root.classList.contains('dropdown_opened');
  const isUpdateButtonPressed = true;
  if (applyButton === null) {
    const isAutoUpdateInput = true;
    return { isUpdateButtonPressed, isAutoUpdateInput, isOpened };
  }
  const isAutoUpdateInput = false;

  return { isUpdateButtonPressed, isAutoUpdateInput, isOpened };
};

const toggleClearButton = (
  clearButton: Element | null,
  countersValue: number[],
) => {
  const countersSum = countersValue.reduce((acc, el) => {
    return acc + el;
  }, 0);

  if (countersSum === 0) {
    clearButton?.classList.add('dropdown__clear-button_hidden');
    return;
  }

  clearButton?.classList.remove('dropdown__clear-button_hidden');
};

const toggleInputFocus = (inputNode: Element, isOpened: boolean) => {
  if (isOpened) {
    inputNode.classList.add('text-field__input_opened');
    return;
  }

  inputNode.classList.remove('text-field__input_opened');
};

const closeMenu = (node: Element, inputNode: Element) => {
  node.classList.remove('dropdown_opened');
  toggleInputFocus(inputNode, false);
  return false;
};

const toggleMenu = (node: Element, inputNode: Element, isOpened: boolean) => {
  if (isOpened) {
    node.classList.remove('dropdown_opened');
    toggleInputFocus(inputNode, false);
    return false;
  }

  node.classList.add('dropdown_opened');
  toggleInputFocus(inputNode, true);
  return true;
};

const createCounters = (node: Element) => {
  const counterNodes = node.querySelectorAll(cssSelectors.items);

  const counters = [...counterNodes].map((el, i) => {
    return new Counter(el, i);
  });

  return counters;
};

const updateCounters = (counters: Counter[], counterValues: number[]) => {
  counters.forEach((el, i) => {
    el.update(counterValues[i]);
  });
};

export {
  initNodes,
  initProps,
  toggleClearButton,
  toggleInputFocus,
  closeMenu,
  toggleMenu,
  createCounters,
  updateCounters,
};
