import Filter from './Filter';
import cssSelectors from './constants';

$(() => {
  $(cssSelectors.filter).each((i, node) => {
    new Filter($(node));
  });
});
