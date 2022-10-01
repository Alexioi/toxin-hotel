import DropdownMenuGuests from './DropdownMenuGuests';
import DropdownMenuRooms from './DropdownMenuRooms';
import cssSelectors from './constants';

$(() => {
  $(cssSelectors.dropdownMenuTypeGuests).each((i, node) => {
    new DropdownMenuGuests($(node));
  });
});

$(() => {
  $(cssSelectors.dropdownMenuTypeRooms).each((i, node) => {
    new DropdownMenuRooms($(node));
  });
});
