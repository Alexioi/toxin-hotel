import { NoUISlider } from '@libs/nouislider';
import { helpers } from '@helpers';

import { cssSelectors } from './constants';

const init = (root: Element) => {
  const parameters = { min: 0, max: 15000, from: 5000, to: 10000 };

  const sliderNode = root.querySelector(cssSelectors.sliderNode);
  const valueNode = root.querySelector(cssSelectors.value);

  if (!(sliderNode instanceof HTMLElement)) {
    throw new helpers.SearchElementError(
      'range slider node not equal HTMLElement',
    );
  }

  if (!(valueNode instanceof HTMLElement)) {
    throw new helpers.SearchElementError(
      'range slider value node not equal HTMLElement',
    );
  }

  new NoUISlider(sliderNode, valueNode, parameters);
};

export { init };
