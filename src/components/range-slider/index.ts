import '@libs/nouislider/nouislider.scss';
import { helpers } from '@helpers';

import { RangeSlider, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.slider).forEach((node) => {
  try {
    new RangeSlider(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
