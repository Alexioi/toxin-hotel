import '@libs/paginationjs/paginationjs.scss';
import { helpers } from '@helpers';

import { Pagination, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.pagination).forEach((el) => {
  try {
    new Pagination(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
