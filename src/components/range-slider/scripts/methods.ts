import { NoUISlider } from '@libs/nouislider';

import { cssSelectors } from './constants';

const init = (root: Element) => {
  const parameters = { min: 0, max: 15000, from: 5000, to: 10000 };

  const sliderNode = root.querySelector(cssSelectors.sliderNode);
  const valueNode = root.querySelector(cssSelectors.value);

  new NoUISlider(sliderNode, valueNode, parameters);
};

export { init };
