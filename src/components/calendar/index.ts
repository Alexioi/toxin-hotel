import Calendar from './Calendar';
import cssSelectors from './constants';

document.querySelectorAll(cssSelectors.calendar).forEach((node) => {
  new Calendar(node);
});
