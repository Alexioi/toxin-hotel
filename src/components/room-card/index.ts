import Carousel from './scripts/Carousel';
import cssSelectors from './scripts/constants';

document.querySelectorAll(cssSelectors.carousel).forEach((node) => {
  new Carousel(node);
});
