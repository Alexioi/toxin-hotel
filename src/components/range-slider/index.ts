import '@libs/nouislider/nouislider.scss';

import { cssSelectors } from './scripts/constants';
import { RangeSlider } from './scripts/RangeSlider';

document.querySelectorAll(cssSelectors.slider).forEach((node) => {
  new RangeSlider(node);
});
