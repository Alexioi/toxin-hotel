import $ from 'jquery';
import 'air-datepicker';

import { JQueryWithAirDatepicker } from './type';
import { config } from './config';

const isElementWithAirDatepicker = (
  element: JQuery<Element>,
): element is JQueryWithAirDatepicker => {
  return 'datepicker' in element;
};

const initAirDatepicker = (root: Element) => {
  const $root = $(root);

  if (isElementWithAirDatepicker($root)) {
    const datepickerData = $root.datepicker(config).data().datepicker;
    return { datepickerData };
  }

  return { datepickerData: null };
};

const init = (root: Element) => {
  const props = initAirDatepicker(root);

  return { props };
};

export { init };
