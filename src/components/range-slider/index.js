import cssSelectors from './constants';
import RangeSlider from './RangeSlider';
import '@libs/nouislider/nouislider.scss';

$(cssSelectors.slider).each((i, node) => {
  new RangeSlider($(node));
});
