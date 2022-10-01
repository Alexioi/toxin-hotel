import Carousel from './Carousel';
import cssSelectors from './constants';

(() => {
  document.querySelectorAll(cssSelectors.carousel).forEach((node) => {
    new Carousel(node);
  });
})();
