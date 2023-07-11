import { cssSelectors } from './constants';

const initNodes = (root: Element) => {
  const button = root.querySelector(cssSelectors.toggleButton);

  return { root, button };
};

export { initNodes };
