import { helpers } from '@helpers';

import { cssSelectors } from './constants';
import { Dom } from './types';

const initNodes = (root: Element) => {
  const counter = root.querySelector(cssSelectors.counter);

  if (counter === null) {
    throw new helpers.SearchElementError('like button counter equal null');
  }

  return { root, counter };
};

const initIsLiked = (node: Element, value: number): boolean => {
  if (value === 0) {
    node.classList.remove('like-button_liked');

    return false;
  }

  return node.classList.contains('like-button_liked');
};

const initCounterValue = (node: Element) => {
  const value = Number(node.innerHTML);

  if (value > 0) {
    return value;
  }

  return 0;
};

const initProps = ({ counter, root }: Dom) => {
  const value = initCounterValue(counter);
  const isLiked = initIsLiked(root, value);

  return { value, isLiked };
};

const calculateCounterValue = (value: number, isLiked: boolean): number => {
  const newValue = isLiked ? value + 1 : value - 1;

  return newValue;
};

const changeCounterValue = (
  oldValue: number,
  isLiked: boolean,
  node: Element,
): number => {
  const element = node;
  const value = calculateCounterValue(oldValue, isLiked);

  if (value > 999) {
    element.innerHTML = '999+';
  } else {
    element.innerHTML = String(value);
  }

  return value;
};

const changeIsLiked = (isLiked: boolean, node: Element) => {
  if (isLiked) {
    node.classList.remove('like-button_liked');
  } else {
    node.classList.add('like-button_liked');
  }

  return !isLiked;
};

export {
  initNodes,
  initIsLiked,
  initCounterValue,
  initProps,
  changeCounterValue,
  changeIsLiked,
};
