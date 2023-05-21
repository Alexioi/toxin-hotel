import NoUISlider from '@libs/nouislider';
import cssSelectors from './constants';

class RangeSlider {
  private node: HTMLElement;

  constructor(node: HTMLElement) {
    this.node = node;

    this._init();
  }

  _init() {
    const parameters = { min: 0, max: 15000, from: 5000, to: 10000 };

    const sliderNode = <HTMLElement>(
      this.node.querySelector(cssSelectors.sliderNode)
    );
    const valueNode = <HTMLElement>this.node.querySelector(cssSelectors.value);

    new NoUISlider(sliderNode, valueNode, parameters);
  }
}

export default RangeSlider;
