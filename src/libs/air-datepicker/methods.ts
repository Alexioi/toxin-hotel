import $ from 'jquery';
import 'air-datepicker';

import arrow from '!raw-loader!@images/decorative/arrow.svg';

import { JQueryWithAirDatepicker } from './type';

const isElementWithAirDatepicker = (
  element: JQuery<Element>,
): element is JQueryWithAirDatepicker => {
  return 'datepicker' in element;
};

const initAirDatepicker = (root: Element) => {
  const airDatepickerOptions = {
    range: true,
    navTitles: { days: 'MM yyyy' },
    prevHtml: `<svg class="datepicker__icon datepicker__icon_back">${arrow}</svg>`,
    nextHtml: `<svg class="datepicker__icon">${arrow}</svg>`,
    minDate: new Date(),
  };

  const $root = $(root);

  if (isElementWithAirDatepicker($root)) {
    const datepickerData = $root
      .datepicker(airDatepickerOptions)
      .data().datepicker;
    return { datepickerData };
  }

  return { datepickerData: null };
};

const init = (root: Element) => {
  const props = initAirDatepicker(root);

  return { props };
};

export { init };
