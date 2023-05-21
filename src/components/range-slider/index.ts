import cssSelectors from './constants';
import RangeSlider from './RangeSlider';
import '@libs/nouislider/nouislider.scss';

document.querySelectorAll(cssSelectors.slider).forEach((node) => {
  new RangeSlider(<HTMLElement>node);
});
