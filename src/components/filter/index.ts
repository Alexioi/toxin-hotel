import { helpers } from '@helpers';

import { Filter, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.filter).forEach((node) => {
  try {
    new Filter(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
