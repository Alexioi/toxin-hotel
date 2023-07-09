import '@libs/paginationjs/paginationjs.scss';

import { Pagination } from './scripts/Pagination';
import { cssSelectors } from './scripts/constants';

document.querySelectorAll(cssSelectors.pagination).forEach((node) => {
  new Pagination(node);
});
