import '@libs/air-datepicker/air-datepicker.scss';
import { helpers } from '@helpers';

import { Header, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.header).forEach((el) => {
  try {
    new Header(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
