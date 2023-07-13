import { helpers } from '@helpers';

import { cssSelectors } from './constants';

const initNodes = (root: Element) => {
  const title = root.querySelector(cssSelectors.title);
  const button = root.querySelector(cssSelectors.button);

  if (title === null) {
    throw new helpers.SearchElementError('dropdown list title equal null');
  }

  if (button === null) {
    throw new helpers.SearchElementError('dropdown list button equal null');
  }

  return { root, title, button };
};

export { initNodes };
