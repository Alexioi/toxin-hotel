import * as TextField from '@components/text-field';
import { AirDatepicker } from '@libs/air-datepicker';
import { helpers } from '@helpers';

import { cssSelectors } from './constants';

const initNodes = (root: Element) => {
  const inputs = root.querySelectorAll<TextField.HTMLInputElementWithPlugin>(
    cssSelectors.input,
  );

  const toggleButtons = root.querySelectorAll(cssSelectors.toggleButtons);
  const menu = root.querySelector(cssSelectors.menu);
  const apply = root.querySelector(cssSelectors.applyButton);
  const clear = root.querySelector(cssSelectors.clearButton);

  if (menu === null) {
    throw new helpers.SearchElementError('calendar menu equal null');
  }

  if (apply === null) {
    throw new helpers.SearchElementError('calendar apply button equal null');
  }

  if (clear === null) {
    throw new helpers.SearchElementError('calendar clear button equal null');
  }

  return { root, inputs, toggleButtons, menu, apply, clear };
};

const convertDateToString = (date: number): string => {
  if (String(date).length !== 2) {
    return `0${date}`;
  }

  return String(date);
};

const calculateFullCustomDate = (date: Date): TextField.CustomDate => {
  const day = convertDateToString(date.getDate());
  const month = convertDateToString(date.getMonth() + 1);
  const year = String(date.getFullYear());

  return { day, month, year };
};

const createDatepicker = (node: Element) => {
  const datepickerNode = node.querySelector(cssSelectors.datepicker);
  if (datepickerNode === null) {
    throw new helpers.SearchElementError('datepicker node equal null');
  }

  return new AirDatepicker(datepickerNode);
};

const getFromAndTo = (
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
) => {
  if (inputs.length === 2) {
    const [inputFrom, inputTo] = inputs;

    const [from] = inputFrom.plugin.getDates();

    const [to] = inputTo.plugin.getDates();

    return { from, to };
  }

  const [input] = inputs;

  const [from, to] = input.plugin.getDates();

  return { from, to };
};

const reverseDates = (
  from: TextField.CustomDate,
  to: TextField.CustomDate,
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
) => {
  if (inputs.length === 2) {
    const [inputFrom, inputTo] = inputs;

    inputFrom.plugin.setDates([to]);
    inputTo.plugin.setDates([from]);
    return;
  }

  const [input] = inputs;

  input.plugin.setDates([to, from]);
};

const displayDates = (
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
) => {
  const { from, to } = getFromAndTo(inputs);

  if (!(from.year.length === 4 && to.year.length === 4)) {
    return;
  }

  const fromDate = `${from.year}.${from.month}.${from.day}`;
  const toDate = `${to.year}.${to.month}.${to.day}`;

  if (new Date(fromDate) > new Date(toDate)) {
    reverseDates(from, to, inputs);
  }
};

const applyDates = (
  datepicker: AirDatepicker,
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
) => {
  const { datepickerFrom, datepickerTo } = datepicker.getSelectedDates();

  if (typeof datepickerTo === 'undefined') {
    return;
  }

  const from = calculateFullCustomDate(datepickerFrom);
  const to = calculateFullCustomDate(datepickerTo);

  if (inputs.length === 2) {
    const [inputFrom, inputTo] = inputs;

    inputFrom.plugin.setDates([from]);

    inputTo.plugin.setDates([to]);
    return;
  }

  const [input] = inputs;

  input.plugin.setDates([from, to]);
};

const clearDates = (
  datepicker: AirDatepicker,
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
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

  datepicker.clearDates();
};

const selectDatesInDatepicker = (
  datepicker: AirDatepicker,
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
) => {
  datepicker.clearDates();

  const { from, to } = getFromAndTo(inputs);

  if (from.year !== '') {
    datepicker.changeDate(`${from.year}.${from.month}.${from.day}`);
  }

  if (to.year !== '') {
    datepicker.changeDate(`${to.year}.${to.month}.${to.day}`);
  }
};

const toggleInputFocus = (
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
  isOpened: boolean,
) => {
  inputs.forEach((node) => {
    if (isOpened) {
      node.classList.remove('text-field__input_focused');
      return;
    }

    node.classList.add('text-field__input_focused');
  });
};

const toggleMenu = (
  menu: Element,
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
  isOpened: boolean,
): boolean => {
  if (isOpened) {
    menu.classList.remove('calendar__menu_visible');
  } else {
    menu.classList.add('calendar__menu_visible');
  }

  toggleInputFocus(inputs, isOpened);

  return !isOpened;
};

const closeMenu = (
  node: Element,
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
): boolean => {
  node.classList.remove('calendar__menu_visible');

  toggleInputFocus(inputs, true);

  return false;
};

export {
  initNodes,
  createDatepicker,
  displayDates,
  applyDates,
  clearDates,
  selectDatesInDatepicker,
  toggleMenu,
  closeMenu,
};
