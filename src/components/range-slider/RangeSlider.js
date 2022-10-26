import IonRangeSlider from 'Libs/ion-rangeslider';
import cssSelectors from './constants';

class RangeSlider {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  _init() {
    const parameters = { min: 0, max: 15000, from: 5000, to: 10000 };

    const $sliderNode = this.$node.find(cssSelectors.sliderNode);
    const $valueNode = this.$node.find(cssSelectors.value);

    new IonRangeSlider($sliderNode, $valueNode, parameters);
  }
}

export default RangeSlider;
