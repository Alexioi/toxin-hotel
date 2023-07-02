import NoUISlider from '@libs/nouislider';

import cssSelectors from './constants';

class RangeSlider {
  private root: Element;

  constructor(node: Element) {
    this.root = node;

    this.init();
  }

  private init() {
    const parameters = { min: 0, max: 15000, from: 5000, to: 10000 };

    const sliderNode = this.root.querySelector(cssSelectors.sliderNode);
    const valueNode = this.root.querySelector(cssSelectors.value);

    new NoUISlider(sliderNode, valueNode, parameters);

    return this;
  }
}

export default RangeSlider;
