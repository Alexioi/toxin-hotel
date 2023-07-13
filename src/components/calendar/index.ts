import { helpers } from '@helpers';

import { Calendar, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.calendar).forEach((node) => {
  try {
    new Calendar(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
