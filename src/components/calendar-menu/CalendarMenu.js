import AirDatepicker from '@libs/air-datepicker';
import cssSelectors from './constants';

class CalendarMenu {
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
    this.$inputs.each((i, input) => {
      input.addEventListener('blur', this._onBlur.bind(this));
    });
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onBlur() {
    const inputsLength = this.$inputs.length === 2;
    const values = inputsLength
      ? [this.$inputs[0].dataset.date, this.$inputs[1].dataset.date]
      : this.$inputs[0].dataset.date.split(',');
    const firstValue = CalendarMenu._removeDateLessThanToday(values[0]);
    const secondValue = CalendarMenu._removeDateLessThanToday(values[1]);

    if (!firstValue && !secondValue) {
      this._clearDates();
      return;
    }

    if (!firstValue) {
      this._changeValues([secondValue, '']);
      return;
    }

    if (!secondValue) {
      this._changeValues([firstValue, '']);
      return;
    }

    if (firstValue === secondValue) {
      this._changeValues([firstValue, '']);
      return;
    }

    const reverseFirstValue = CalendarMenu._reverseDate(firstValue);
    const reverseSecondValue = CalendarMenu._reverseDate(secondValue);

    if (new Date(reverseFirstValue) < new Date(reverseSecondValue)) {
      this._changeValues([firstValue, secondValue]);
    } else {
      this._changeValues([secondValue, firstValue]);
    }
  }

  _changeValues(values) {
    this._clearDates();

    if (this.$inputs.length === 2) {
      values.forEach((value, index) => {
        this.$inputs[index].dataset.date = value;
        if (value !== '') {
          this.datepicker.changeDate(CalendarMenu._reverseDate(value));
        }
      });
    }

    if (this.$inputs.length === 1) {
      this.$inputs[0].dataset.date = values.join(',');
    }

    this._updateInputs(values);
  }

  static _removeDateLessThanToday(date) {
    if (new Date(CalendarMenu._reverseDate(date)) < new Date()) {
      return '';
    }

    return date;
  }

  static _reverseDate(date) {
    return date.split('.').reverse().join('.');
  }

  _onClickDocument(event) {
    const { target } = event;
    const [firstButton, secondButton] = this.$toggleButtons;
    const isCurrentMenuTarget = event.composedPath().includes(this.$menu[0]);
    const isCurrentButton = target === firstButton || target === secondButton;

    if (!isCurrentMenuTarget && !isCurrentButton) {
      this.$menu.removeClass('calendar-menu__menu_visible');
    }
  }

  _applyDates() {
    const dates = this.datepicker.getSelectedDates();

    if (dates.length !== 2) {
      return;
    }

    this._toggleVisible();

    const firstDate = CalendarMenu._calculateFullDate(dates[0]);
    const secondDate = CalendarMenu._calculateFullDate(dates[1]);

    if (this.$inputs.length === 2) {
      this.$inputs[0].dataset.date = firstDate;
      this.$inputs[1].dataset.date = secondDate;
    }

    if (this.$inputs.length === 1) {
      this.$inputs[0].dataset.date = `${firstDate},${secondDate}`;
    }

    this.$inputs.each((i, input) => {
      const event = new Event('update');
      input.dispatchEvent(event);
    });
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
    if (this.$inputs.length === 2) {
      this._updateInputs(['', '']);
    } else {
      this._updateInputs([',']);
    }

    this.datepicker.clearDates();
  }

  _updateInputs(dates) {
    const event = new Event('update');

    if (this.$inputs.length === 2) {
      dates.forEach((date, index) => {
        this.$inputs[index].dataset.date = date;
        this.$inputs[index].dispatchEvent(event);
      });
    }

    if (this.$inputs.length === 1) {
      this.$inputs[0].dataset.date = dates.join(',');
      this.$inputs[0].dispatchEvent(event);
    }
  }

  _toggleVisible() {
    this.$menu.toggleClass('calendar-menu__menu_visible');
    const isOpened = this.$menu.hasClass('calendar-menu__menu_visible');

    this.$inputs.each((i) => {
      this.$inputs[i].dataset.focus = isOpened ? 'true' : 'false';
    });
  }
}

export default CalendarMenu;
