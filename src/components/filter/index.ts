import Filter from './scripts/Filter';
import cssSelectors from './scripts/constants';

document.querySelectorAll(cssSelectors.filter).forEach((node) => {
  new Filter(node);
});
