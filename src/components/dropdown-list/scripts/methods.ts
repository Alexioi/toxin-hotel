import { cssSelectors } from './constants';

const initNodes = (root: Element) => {
  const title = root.querySelector(cssSelectors.title);
  const button = root.querySelector(cssSelectors.button);

  return { root, title, button };
};

export { initNodes };
