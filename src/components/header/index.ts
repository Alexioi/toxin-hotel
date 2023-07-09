import '@libs/air-datepicker/air-datepicker.scss';

import { cssSelectors } from './scripts/constants';
import { Header } from './scripts/Header';

document.querySelectorAll(cssSelectors.header).forEach((node) => {
  new Header(node);
});
