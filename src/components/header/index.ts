import '@libs/air-datepicker/air-datepicker.scss';
import { helpers } from '@helpers';

import { Header, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.header).forEach((node) => {
  try {
    new Header(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
