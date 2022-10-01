import cssSelectors from './constants';
import Header from './Header';

(() => {
  document.querySelectorAll(cssSelectors.header).forEach((node) => {
    new Header(node);
  });
})();
