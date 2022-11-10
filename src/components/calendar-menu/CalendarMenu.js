import AirDatepicker from 'Libs/air-datepicker';
import cssSelectors from './constants';

class CalendarMenu {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._addDefaultValueToInputs();
    this._initDatepicker();
    this._attachEventsHandler();
  }

  _findNodes() {
    this.$inputs = this.$node.find(cssSelectors.input);
    this.$buttons = this.$node.find(cssSelectors.inputsButton);
    this.$menu = this.$node.find(cssSelectors.menu);
    this.$nodeForDatepicker = this.$node.find(cssSelectors.datepicker);
    this.$apply = this.$node.find(cssSelectors.applyButton);
    this.$clear = this.$node.find(cssSelectors.clearButton);
  }

  _addDefaultValueToInputs() {
    this.$inputs.val('ДД.ММ.ГГГГ');
  }

  _initDatepicker() {
    this.datepicker = new AirDatepicker(this.$nodeForDatepicker);
  }

  _attachEventsHandler() {
    this.$apply.on('click', this._applyDates.bind(this));
    this.$clear.on('click', this._clearDates.bind(this));
    this.$buttons.on('click', this._toggleVisible.bind(this));
    this.$inputs.each((i, input) => {
      input.addEventListener('blur', this._onBlur.bind(this));
    });
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onBlur() {
    const firstValue = this._removeDateLessThanToday(this.$inputs[0].value);
    const secondValue = this._removeDateLessThanToday(this.$inputs[1].value);

    if (!this._validDate(firstValue) && !this._validDate(secondValue)) {
      this._clearDates();
      this.$inputs[0].value = '';
      this.$inputs[1].value = '';
      return;
    }

    if (!this._validDate(firstValue)) {
      this._changeValues([secondValue]);
      return;
    }

    if (!this._validDate(secondValue)) {
      this._changeValues([firstValue]);
      return;
    }

    if (firstValue === secondValue) {
      this._changeValues([firstValue]);
      return;
    }

    const reverseFirstValue = this._reverseDate(firstValue);
    const reverseSecondValue = this._reverseDate(secondValue);

    if (new Date(reverseFirstValue) < new Date(reverseSecondValue)) {
      this._changeValues([firstValue, secondValue]);
    } else {
      this._changeValues([secondValue, firstValue]);
    }
  }

  _removeDateLessThanToday(date) {
    if (new Date(this._reverseDate(date)) < new Date()) {
      return '';
    }

    return date;
  }

  _validDate(checkedDate) {
    const [day, month, year] = checkedDate.split('.').map((value, index) => {
      if (index === 1) {
        return Number(value) - 1;
      }
      return Number(value);
    });
    const date = new Date(year, month, day);

    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  _changeValues(values) {
    this._clearDates();

    if (values.length === 1) {
      this.$inputs[1].value = '';
    }

    values.forEach((value, index) => {
      this.$inputs[index].value = value;
      this.datepicker.changeDate(this._reverseDate(value));
    });
  }

  _reverseDate(date) {
    return date.split('.').reverse().join('.');
  }

  _onClickDocument(event) {
    const isCurrentMenuTarget = event.composedPath().includes(this.$menu[0]);
    const isCurrentButton = event.target === this.$buttons[0] || event.target === this.$buttons[1];

    if (!isCurrentMenuTarget && !isCurrentButton) {
      this.$menu.removeClass('calendar-menu__menu_visible');
    }
  }

  _applyDates() {
    const dates = this.datepicker.getSelectedDates();

    if (dates.length !== 2) {
      return;
    }

    if (this.$inputs.length === 2) {
      const firstDate = CalendarMenu._calculateFullDate(dates[0]);
      const secondDate = CalendarMenu._calculateFullDate(dates[1]);

      this.$inputs[0].value = firstDate;
      this.$inputs[1].value = secondDate;
      this._toggleVisible();
      return;
    }

    const firstDate = CalendarMenu._calculateDayAndMount(dates[0]);
    const secondDate = CalendarMenu._calculateDayAndMount(dates[1]);

    this.$inputs.val(`${firstDate} - ${secondDate}`);
    this._toggleVisible();
  }

  static _calculateFullDate(date) {
    let day = String(date.getDate());
    let month = String(Number(date.getMonth()) + 1);
    const year = date.getFullYear();

    if (day.length !== 2) {
      day = `0${day}`;
    }

    if (month.length !== 2) {
      month = `0${month}`;
    }

    return `${day}.${month}.${year}`;
  }

  _clearDates() {
    this.datepicker.clearDates();
  }

  _toggleVisible() {
    this.$menu.toggleClass('calendar-menu__menu_visible');
    const isOpened = this.$menu.hasClass('calendar-menu__menu_visible');

    this.$inputs.each((i) => {
      this.$inputs[i].dataset.focus = isOpened ? 'true' : 'false';
    });
  }

  static _calculateDayAndMount(date) {
    const namesOfMonth = [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек',
    ];

    const day = date.getDate();
    const monthNumber = date.getMonth();

    const month = namesOfMonth[monthNumber];

    return `${day} ${month}`;
  }
}

export default CalendarMenu;
