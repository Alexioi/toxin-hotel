import cssSelectors from './scripts/constants';
import RangeSlider from './scripts/RangeSlider';
import '@libs/nouislider/nouislider.scss';

document.querySelectorAll(cssSelectors.slider).forEach((node) => {
  new RangeSlider(node);
});
