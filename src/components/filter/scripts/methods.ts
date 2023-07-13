import { helpers } from '@helpers';

import { cssSelectors } from './constants';

const initNodes = (root: Element) => {
  const button = root.querySelector(cssSelectors.toggleButton);

  if (button === null) {
    throw new helpers.SearchElementError('filter button equal null');
  }

  return { root, button };
};

export { initNodes };
