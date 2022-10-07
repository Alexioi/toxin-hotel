import cssSelectors from './constants';
import RangeSlider from './RangeSlider';

$(cssSelectors.slider).each((i, node) => {
  new RangeSlider($(node));
});
