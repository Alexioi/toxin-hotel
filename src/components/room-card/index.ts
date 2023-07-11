import { Carousel, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.carousel).forEach((node) => {
  new Carousel(node);
});
