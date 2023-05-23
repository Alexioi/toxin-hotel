import DropdownMenu from './DropdownMenu';
import cssSelectors from './constants';

document.querySelectorAll(cssSelectors.dropdownMenu).forEach((node) => {
  new DropdownMenu(<HTMLDivElement>node);
});
