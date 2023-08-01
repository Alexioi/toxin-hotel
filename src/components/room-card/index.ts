import { helpers } from '@helpers';

import { Carousel, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.carousel).forEach((el) => {
  try {
    new Carousel(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
