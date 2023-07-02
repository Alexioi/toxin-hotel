import { Date as customDate } from '@components/text-field/scripts/types';
import { HTMLInputElementWithPlugin } from '@components/text-field/scripts/TextField';
import { AirDatepicker, JQueryWithAirDatepicker } from '@libs/air-datepicker';
import helpers from '@helpers/index';

import cssSelectors from './constants';

const isJQueryWithAirDatepicker = (
  element: JQuery | JQueryWithAirDatepicker,
): element is JQueryWithAirDatepicker => {
  return (element as JQueryWithAirDatepicker).datepicker !== undefined;
};

const getDateToString = (date: number): string => {
  if (String(date).length !== 2) {
    return `0${date}`;
  }

  return String(date);
};

const calculateFullDate = (date: Date): customDate => {
  const day = getDateToString(date.getDate());
  const month = getDateToString(date.getMonth() + 1);
  const year = String(date.getFullYear());

  return { day, month, year };
};

const createDatepicker = (node: Element) => {
  const $datepickerNode = $(node).find(cssSelectors.datepicker);

  if (isJQueryWithAirDatepicker($datepickerNode)) {
    return new AirDatepicker($datepickerNode);
  }

  return null;
};

const displayDates = (
  inputs: NodeListOf<HTMLInputElementWithPlugin> | never[],
) => {
  if (inputs.length === 2) {
    const [inputFrom, inputTo] = inputs;

    const [from] = inputFrom.plugin.getDates();

    const [to] = inputTo.plugin.getDates();

    if (from.year.length === 4 && to.year.length === 4) {
      const fromDate = `${from.year}.${from.month}.${from.day}`;
      const toDate = `${to.year}.${to.month}.${to.day}`;

      if (new Date(fromDate) > new Date(toDate)) {
        inputFrom.plugin.setDates([to]);

        inputTo.plugin.setDates([from]);
      }
    }
  } else {
    const [input] = inputs;

    const [from, to] = input.plugin.getDates();

    if (to.year.length === 4) {
      const fromDate = `${from.year}.${from.month}.${from.day}`;
      const toDate = `${to.year}.${to.month}.${to.day}`;

      if (new Date(fromDate) > new Date(toDate)) {
        input.plugin.setDates([to, from]);
      }
    }
  }
};

const applyDates = (
  datepicker: AirDatepicker | null,
  inputs: NodeListOf<HTMLInputElementWithPlugin> | never[],
) => {
  if (datepicker === null) {
    return;
  }

  const { datepickerFrom, datepickerTo } = datepicker.getSelectedDates();

  if (typeof datepickerTo === 'undefined') {
    return;
  }

  const from = calculateFullDate(datepickerFrom);
  const to = calculateFullDate(datepickerTo);

  if (inputs.length === 2) {
    const [inputFrom, inputTo] = inputs;

    inputFrom.plugin.setDates([from]);

    inputTo.plugin.setDates([to]);
  }

  if (inputs.length === 1) {
    const [input] = inputs;

    input.plugin.setDates([from, to]);
  }
};

const clearDates = (
  datepicker: AirDatepicker | null,
  inputs: NodeListOf<HTMLInputElementWithPlugin> | never[],
) => {
  const emptyDate = {
    day: '',
    month: '',
    year: '',
  };

  if (inputs.length === 2) {
    const [inputFrom, inputTo] = inputs;

    inputFrom.plugin.setDates([{ ...emptyDate }]);

    inputTo.plugin.setDates([{ ...emptyDate }]);
  }

  if (inputs.length === 1) {
    const [input] = inputs;

    input.plugin.setDates([{ ...emptyDate }, { ...emptyDate }]);
  }

  datepicker?.clearDates();
};

const selectDatesInDatepicker = (
  datepicker: AirDatepicker | null,
  inputs: NodeListOf<HTMLInputElementWithPlugin> | never[],
) => {
  datepicker?.clearDates();

  if (inputs.length === 2) {
    const [inputFrom, inputTo] = inputs;

    const [from] = inputFrom.plugin.getDates();

    const [to] = inputTo.plugin.getDates();

    if (from.year !== '') {
      const { day, month, year } = from;

      datepicker?.changeDate(`${year}.${month}.${day}`);
    }

    if (to.year !== '') {
      const { day, month, year } = to;

      datepicker?.changeDate(`${year}.${month}.${day}`);
    }
  } else {
    const [input] = inputs;

    const [from, to] = input.plugin.getDates();

    if (from.year !== '') {
      datepicker?.changeDate(`${from.year}.${from.month}.${from.day}`);

      datepicker?.changeDate(`${to.year}.${to.month}.${to.day}`);
    }
  }
};

const toggleMenu = (
  menu: Element | null,
  inputs: NodeListOf<HTMLInputElementWithPlugin> | never[],
) => {
  menu?.classList.toggle('calendar__menu_visible');

  const isOpened = menu?.classList.contains('calendar__menu_visible');

  inputs.forEach((node) => {
    if (isOpened) {
      node.classList.add('text-field__input_focused');
    } else {
      node.classList.remove('text-field__input_focused');
    }
  });
};

const closeMenu = (
  event: Event,
  node: Element | null,
  inputs: NodeListOf<HTMLInputElementWithPlugin> | never[],
  elements: (Element | null)[],
) => {
  if (!helpers.isElementsIncludeNode(event, elements)) {
    node?.classList.remove('calendar__menu_visible');

    inputs.forEach((node) => {
      node.classList.remove('text-field__input_focused');
    });
  }
};

export {
  createDatepicker,
  displayDates,
  applyDates,
  clearDates,
  selectDatesInDatepicker,
  toggleMenu,
  closeMenu,
};
