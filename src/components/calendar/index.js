import Calendar from './Calendar';
import cssSelectors from './constants';

$(() => {
  $(cssSelectors.calendar).each((i, node) => {
    new Calendar($(node));
  });
});
