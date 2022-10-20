import cssSelectors from './constants';
import AirDatepicker from '../../libs/air-datepicker';

class Calendar {
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
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onClickDocument(event) {
    const isCurrentMenuTarget = event.composedPath().includes(this.$menu[0]);
    const isCurrentButton = event.target === this.$buttons[0] || event.target === this.$buttons[1];

    if (!isCurrentMenuTarget && !isCurrentButton) {
      this.$menu.removeClass('calendar__menu_visible');
    }
  }

  _applyDates() {
    const dates = this.datepicker.getSelectedDates();

    if (dates.length !== 2) {
      return;
    }

    if (this.$inputs.length === 2) {
      const firstDate = Calendar._calculateFullDate(dates[0]);
      const secondDate = Calendar._calculateFullDate(dates[1]);

      this.$inputs[0].value = firstDate;
      this.$inputs[1].value = secondDate;
      this._toggleVisible();
      return;
    }

    const firstDate = Calendar._calculateDayAndMount(dates[0]);
    const secondDate = Calendar._calculateDayAndMount(dates[1]);

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
    this.$menu.toggleClass('calendar__menu_visible');
    const isOpened = this.$menu.hasClass('calendar__menu_visible');

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

export default Calendar;
