import { Calendar, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.calendar).forEach((node) => {
  new Calendar(node);
});
