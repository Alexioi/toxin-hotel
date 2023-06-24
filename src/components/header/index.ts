import cssSelectors from './scripts/constants';
import Header from './scripts/Header';
import '@libs/air-datepicker/air-datepicker.scss';

document.querySelectorAll(cssSelectors.header).forEach((node) => {
  new Header(node);
});
