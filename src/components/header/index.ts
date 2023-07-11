import '@libs/air-datepicker/air-datepicker.scss';

import { Header, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.header).forEach((node) => {
  new Header(node);
});
