import '@libs/nouislider/nouislider.scss';
import { helpers } from '@helpers';

import { RangeSlider, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.slider).forEach((el) => {
  try {
    new RangeSlider(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
