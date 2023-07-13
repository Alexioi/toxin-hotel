import '@libs/paginationjs/paginationjs.scss';
import { helpers } from '@helpers';

import { Pagination, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.pagination).forEach((node) => {
  try {
    new Pagination(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
