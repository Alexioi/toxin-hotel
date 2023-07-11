import '@libs/nouislider/nouislider.scss';

import { RangeSlider, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.slider).forEach((node) => {
  new RangeSlider(node);
});
