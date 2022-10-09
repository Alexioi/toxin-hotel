import DropdownList from './DropdownList';
import cssSelectors from './constants';

$(cssSelectors.dropdownlist).each((i, node) => {
  new DropdownList($(node));
});
