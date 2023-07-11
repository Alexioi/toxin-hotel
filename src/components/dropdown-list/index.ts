import { DropdownList, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.dropdownlist).forEach((node) => {
  new DropdownList(node);
});
