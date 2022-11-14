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
    this.$inputs.on('click', this._toggleVisible.bind(this));
    this.$inputs.each((i, input) => {
      input.addEventListener('blur', this._onBlur.bind(this));
    });
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onBlur() {
    const values =
      this.$inputs.length === 2
        ? [this.$inputs[0].dataset.date, this.$inputs[1].dataset.date]
        : this.$inputs[0].dataset.date.split(',');
    const firstValue = this._removeDateLessThanToday(values[0]);
    const secondValue = this._removeDateLessThanToday(values[1]);

    console.log(firstValue, secondValue);

    if (!firstValue && !secondValue) {
      this._clearDates();
      // this.$inputs[0].value = '';
      // this.$inputs[1].value = '';
      return;
    }

    if (!firstValue) {
      this._changeValues([secondValue]);
      return;
    }

    if (!secondValue) {
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
    const isCurrentInput = event.target === this.$inputs[0] || event.target === this.$inputs[1];

    if (!isCurrentMenuTarget && !isCurrentInput) {
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
      const event = new Event('blur');
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
    this.$inputs.each((index, input) => {
      // const event = new Event('blur');

      if (this.$inputs.length === 2) {
        this.$inputs[index].dataset.date = '';
        // input.dispatchEvent(event);
        return;
      }
      this.$inputs[index].dataset.date = ',';
      // input.dispatchEvent(event);
    });
    this.datepicker.clearDates();
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
