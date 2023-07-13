import { helpers } from '@helpers';

import { Dropdown, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.dropdownMenu).forEach((node) => {
  try {
    new Dropdown(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
