import { helpers } from '@helpers';

import { Filter, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.filter).forEach((el) => {
  try {
    new Filter(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
