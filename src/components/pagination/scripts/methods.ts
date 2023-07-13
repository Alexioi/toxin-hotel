import { Paginationjs } from '@libs/paginationjs';
import { helpers } from '@helpers';

import { cssSelectors } from './constants';
import { Dom } from './type';

const initNodes = (root: Element) => {
  const plugin = root.querySelector(cssSelectors.plugin);
  const range = root.querySelector(cssSelectors.range);

  if (plugin === null) {
    throw new helpers.SearchElementError('pagination plugin equal null');
  }

  if (range === null) {
    throw new helpers.SearchElementError('pagination range equal null');
  }

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

  new Paginationjs(plugin, range, count);
};

export { initNodes, getCount, initPlugin };
