import Pagination from './Pagination';
import cssSelectors from './constants';
import '@libs/paginationjs/paginationjs.scss';

$(cssSelectors.pagination).each((i, node) => {
  new Pagination($(node));
});
