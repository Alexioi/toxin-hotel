import { helpers } from '@helpers';

import { DropdownList, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.dropdownlist).forEach((node) => {
  try {
    new DropdownList(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
