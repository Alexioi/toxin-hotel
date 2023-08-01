import { helpers } from '@helpers';

import { DropdownList, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.dropdownlist).forEach((el) => {
  try {
    new DropdownList(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
