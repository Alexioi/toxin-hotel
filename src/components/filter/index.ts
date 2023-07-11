import { Filter, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.filter).forEach((node) => {
  new Filter(node);
});
