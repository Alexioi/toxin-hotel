import AirDatepicker from '@libs/air-datepicker';
import cssSelectors from './constants';

import helpers from '../../helpers';

const calculateFullDate = (date) => {
  let day = String(date.getDate());
  let month = String(Number(date.getMonth()) + 1);
  const year = date.getFullYear();
  if (day.length !== 2) {
    day = `0${day}`;
  }
  if (month.length !== 2) {
    month = `0${month}`;
  }
  return { day, month, year };
};

class Calendar {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._initDatepicker();
    this._attachEventsHandler();
  }

  _findNodes() {
    this.$inputs = this.$node.find(cssSelectors.input);
    this.$toggleButtons = this.$node.find(cssSelectors.toggleButtons);
    this.$menu = this.$node.find(cssSelectors.menu);
    this.$nodeForDatepicker = this.$node.find(cssSelectors.datepicker);
    this.$apply = this.$node.find(cssSelectors.applyButton);
    this.$clear = this.$node.find(cssSelectors.clearButton);
  }

  _initDatepicker() {
    this.datepicker = new AirDatepicker(this.$nodeForDatepicker);
  }

  _attachEventsHandler() {
    this.$apply.on('click', this._applyDates.bind(this));
    this.$clear.on('click', this._clearDates.bind(this));
    this.$toggleButtons.on('click', this._toggleVisible.bind(this));
    this.$inputs.on('blur', this._onblur.bind(this));
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onblur() {
    if (this.$inputs.length === 2) {
      const [from] = this.$inputs[0].plugin.getDates();
      const [to] = this.$inputs[1].plugin.getDates();

      if (from.year.length === 4 && to.year.length === 4) {
        const fromDate = `${from.year}.${from.month}.${from.day}`;
        const toDate = `${to.year}.${to.month}.${to.day}`;

        if (new Date(fromDate) > new Date(toDate)) {
          const [inputFrom, inputTo] = this.$inputs;

          inputFrom.plugin.setDates([to]);
          inputTo.plugin.setDates([from]);
        }
      }
    } else {
      const [input] = this.$inputs;
      const [from, to] = input.plugin.getDates();

      if (to.year.length === 4) {
        const fromDate = `${from.year}.${from.month}.${from.day}`;
        const toDate = `${to.year}.${to.month}.${to.day}`;

        if (new Date(fromDate) > new Date(toDate)) {
          input.plugin.setDates([to, from]);
        }
      }
    }
  }

  _onClickDocument(event) {
    const [firstButton, secondButton] = this.$toggleButtons;
    const elements = [this.$menu[0], firstButton, secondButton];
    if (!helpers.isElementsIncludeNode(event, elements)) {
      this.$menu.removeClass('calendar__menu_visible');

      this.$inputs.each((i) => {
        this.$inputs[i].classList.remove('text-field__input_focused');
      });
    }
  }

  _applyDates() {
    const [datepickerFrom, datepickerTo] = this.datepicker.getSelectedDates();

    if (typeof datepickerTo === 'undefined') {
      return;
    }

    const from = calculateFullDate(datepickerFrom);
    const to = calculateFullDate(datepickerTo);

    if (this.$inputs.length === 2) {
      const [inputFrom, inputTo] = this.$inputs;

      inputFrom.plugin.setDates([from]);
      inputTo.plugin.setDates([to]);
    }

    if (this.$inputs.length === 1) {
      const [input] = this.$inputs;

      input.plugin.setDates([from, to]);
    }
  }

  _clearDates() {
    const emptyDate = {
      day: '',
      month: '',
      year: '',
    };

    if (this.$inputs.length === 2) {
      const [inputFrom, inputTo] = this.$inputs;

      inputFrom.plugin.setDates([{ ...emptyDate }]);
      inputTo.plugin.setDates([{ ...emptyDate }]);
    }

    if (this.$inputs.length === 1) {
      const [input] = this.$inputs;

      input.plugin.setDates([{ ...emptyDate }, { ...emptyDate }]);
    }
    this.datepicker.clearDates();
  }

  _toggleVisible() {
    this.$menu.toggleClass('calendar__menu_visible');

    const isOpened = this.$menu.hasClass('calendar__menu_visible');

    this.$inputs.each((i) => {
      if (isOpened) {
        this.$inputs[i].classList.add('text-field__input_focused');
      } else {
        this.$inputs[i].classList.remove('text-field__input_focused');
      }
    });

    this.datepicker.clearDates();

    if (this.$inputs.length === 2) {
      const [from] = this.$inputs[0].plugin.getDates();
      const [to] = this.$inputs[1].plugin.getDates();

      if (from.year !== '') {
        const { day, month, year } = from;

        this.datepicker.changeDate(`${year}.${month}.${day}`);
      }

      if (to.year !== '') {
        const { day, month, year } = to;

        this.datepicker.changeDate(`${year}.${month}.${day}`);
      }
    } else {
      const [input] = this.$inputs;
      const [from, to] = input.plugin.getDates();

      if (from.year !== '') {
        this.datepicker.changeDate(`${from.year}.${from.month}.${from.day}`);

        this.datepicker.changeDate(`${to.year}.${to.month}.${to.day}`);
      }
    }
  }
}

export default Calendar;
