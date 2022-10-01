import Pagination from './Pagination';
import cssSelectors from './constants';

$(() => {
  $(cssSelectors.pagination).each((i, node) => {
    new Pagination($(node));
  });
});
