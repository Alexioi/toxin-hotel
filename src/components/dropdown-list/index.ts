import DropdownList from './scripts/DropdownList';
import cssSelectors from './scripts/constants';

document.querySelectorAll(cssSelectors.dropdownlist).forEach((node) => {
  new DropdownList(node);
});
