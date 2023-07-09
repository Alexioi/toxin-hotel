import { Calendar } from './scripts/Calendar';
import { cssSelectors } from './scripts/constants';

document.querySelectorAll(cssSelectors.calendar).forEach((node) => {
  new Calendar(node);
});
