import { helpers } from '@helpers';

import { Dropdown, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.dropdownMenu).forEach((el) => {
  try {
    new Dropdown(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
