import '@libs/paginationjs/paginationjs.scss';

import { Pagination, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.pagination).forEach((node) => {
  new Pagination(node);
});
