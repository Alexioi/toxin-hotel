import Dropdown from './scripts/Dropdown';
import cssSelectors from './scripts/constants';

document.querySelectorAll(cssSelectors.dropdownMenu).forEach((node) => {
  new Dropdown(node);
});
