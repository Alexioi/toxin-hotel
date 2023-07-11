import { Dropdown, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.dropdownMenu).forEach((node) => {
  new Dropdown(node);
});
