import cssSelectors from './constants';
import Header from './Header';
import '../../libs/air-datepicker/air-datepicker.scss';

(() => {
  document.querySelectorAll(cssSelectors.header).forEach((node) => {
    new Header(node);
  });
})();
