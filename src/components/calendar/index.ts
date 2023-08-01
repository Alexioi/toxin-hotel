import { helpers } from '@helpers';

import { Calendar, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.calendar).forEach((el) => {
  try {
    new Calendar(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
