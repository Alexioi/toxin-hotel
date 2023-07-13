import { helpers } from '@helpers';

import { Carousel, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.carousel).forEach((node) => {
  try {
    new Carousel(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
