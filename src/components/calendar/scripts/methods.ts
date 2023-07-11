import * as TextField from '@components/text-field';
import { AirDatepicker } from '@libs/air-datepicker';
import { helpers } from '@helpers/index';

import { cssSelectors } from './constants';

const initNodes = (node: Element) => {
  const root = node;
  const inputs = root.querySelectorAll<TextField.HTMLInputElementWithPlugin>(
    cssSelectors.input,
  );
  const toggleButtons = root.querySelectorAll(cssSelectors.toggleButtons);
  const menu = root.querySelector(cssSelectors.menu);
  const apply = root.querySelector(cssSelectors.applyButton);
  const clear = root.querySelector(cssSelectors.clearButton);

  return { root, inputs, toggleButtons, menu, apply, clear };
};

const convertDateToString = (date: number): string => {
  if (String(date).length !== 2) {
    return `0${date}`;
  }

  return String(date);
};

const calculateFullDate = (date: Date): TextField.CustomDate => {
  const day = convertDateToString(date.getDate());
  const month = convertDateToString(date.getMonth() + 1);
  const year = String(date.getFullYear());

  return { day, month, year };
};

const createDatepicker = (node: Element) => {
  const datepickerNode = node.querySelector(cssSelectors.datepicker);
  if (datepickerNode === null) {
    return null;
  }

  return new AirDatepicker(datepickerNode);
};

const displayDates = (
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
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
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
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

  datepicker?.clearDates();
};

const selectDatesInDatepicker = (
  datepicker: AirDatepicker | null,
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
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
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
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
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>,
  elements: (Element | null)[],
) => {
  if (helpers.isElementsIncludeNode(event, elements)) {
    return;
  }

  node?.classList.remove('calendar__menu_visible');

  inputs.forEach((input) => {
    input.classList.remove('text-field__input_focused');
  });
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
