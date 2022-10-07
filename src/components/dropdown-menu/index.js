import DropdownMenu from './DropdownMenu';
import cssSelectors from './constants';

(() => {
  document.querySelectorAll('.js-dropdown-menu').forEach((node) => {
    new DropdownMenu(node);
  });
})();
