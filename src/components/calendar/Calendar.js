import AirDatepicker from '@libs/air-datepicker';
import cssSelectors from './constants';

import helpers from '../../helpers';

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
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  static _removeDateLessThanToday(date) {
    if (new Date(Calendar._reverseDate(date)) < new Date()) {
      return '';
    }
    return date;
  }

  static _reverseDate(date) {
    return date.split('.').reverse().join('.');
  }

  _onClickDocument(event) {
    const [firstButton, secondButton] = this.$toggleButtons;
    const elements = [this.$menu[0], firstButton, secondButton];
    if (!helpers.isElementsIncludeNode(event, elements)) {
      this.$menu.removeClass('calendar__menu_visible');
    }
  }

  _applyDates() {
    const dates = this.datepicker.getSelectedDates();

    if (dates.length !== 2) {
      return;
    }

    const firstDate = Calendar._calculateFullDate(dates[0]);
    const secondDate = Calendar._calculateFullDate(dates[1]);

    const arrayFirstDate = firstDate.split('.');
    const arraySecondDate = secondDate.split('.');

    if (this.$inputs.length === 2) {
      this.$inputs[0].plugin.setDates([
        {
          day: arrayFirstDate[0],
          month: arrayFirstDate[1],
          year: arrayFirstDate[2],
        },
      ]);
      this.$inputs[1].plugin.setDates([
        {
          day: arraySecondDate[0],
          month: arraySecondDate[1],
          year: arraySecondDate[2],
        },
      ]);
    }

    if (this.$inputs.length === 1) {
      this.$inputs[0].plugin.setDates([
        {
          day: arrayFirstDate[0],
          month: arrayFirstDate[1],
          year: arrayFirstDate[2],
        },
        {
          day: arraySecondDate[0],
          month: arraySecondDate[1],
          year: arraySecondDate[2],
        },
      ]);
    }
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
      this.$inputs[0].plugin.setDates([
        {
          day: '',
          month: '',
          year: '',
        },
      ]);
      this.$inputs[1].plugin.setDates([
        {
          day: '',
          month: '',
          year: '',
        },
      ]);
    }

    if (this.$inputs.length === 1) {
      this.$inputs[0].plugin.setDates([
        {
          day: '',
          month: '',
          year: '',
        },
        {
          day: '',
          month: '',
          year: '',
        },
      ]);
    }
    this.datepicker.clearDates();
  }

  _toggleVisible() {
    this.$menu.toggleClass('calendar__menu_visible');

    this._clearDates();

    if (this.$inputs.length === 2) {
      const firstDate = this.$inputs[0].plugin.getDates();
      const secondDate = this.$inputs[1].plugin.getDates();

      if (firstDate.year !== '') {
        this.datepicker.changeDate(
          `${firstDate.year}.${firstDate.month}.${firstDate.day}`,
        );

        this.datepicker.changeDate(
          `${secondDate.year}.${secondDate.month}.${secondDate.day}`,
        );
      }
    } else {
      const [firstDate, secondDate] = this.$inputs[0].plugin.getDates();

      if (firstDate.year !== '') {
        this.datepicker.changeDate(
          `${firstDate.year}.${firstDate.month}.${firstDate.day}`,
        );

        this.datepicker.changeDate(
          `${secondDate.year}.${secondDate.month}.${secondDate.day}`,
        );
      }
    }

    const isOpened = this.$menu.hasClass('calendar__menu_visible');
    this.$inputs.each((i) => {
      this.$inputs[i].dataset.focus = isOpened ? 'true' : 'false';
    });
  }
}

export default Calendar;
