import { Paginationjs } from '@libs/paginationjs';

import { cssSelectors } from './constants';
import { Dom } from './type';

const initNodes = (root: Element) => {
  const plugin = root.querySelector(cssSelectors.plugin);
  const range = root.querySelector(cssSelectors.range);

  return { root, plugin, range };
};

const getCount = (dom: Dom) => {
  const { root } = dom;

  if (!(root instanceof HTMLElement)) {
    return 0;
  }

  const count = Number(root.dataset.count);

  return count;
};

const initPlugin = (dom: Dom, count: number) => {
  const { plugin, range } = dom;

  if (plugin === null) {
    return;
  }

  if (range === null) {
    return;
  }

  new Paginationjs(plugin, range, count);
};

export { initNodes, getCount, initPlugin };
