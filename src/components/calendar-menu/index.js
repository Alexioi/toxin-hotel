import CalendarMenu from './CalendarMenu';
import cssSelectors from './constants';

$(cssSelectors.calendarMenu).each((i, node) => {
  new CalendarMenu($(node));
});
