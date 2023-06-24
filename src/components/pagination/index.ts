import Pagination from './scripts/Pagination';
import cssSelectors from './scripts/constants';
import '@libs/paginationjs/paginationjs.scss';

document.querySelectorAll(cssSelectors.pagination).forEach((node) => {
  new Pagination(node);
});
