import 'air-datepicker';

class Calendar {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._addValueToInputs();
    this._initDatepicker();
    this._attachEventsHandler();
  }

  _findNodes() {
    this.$inputs = this.$node.find('.js-calendar__inputs input');
    this.$apply = this.$node.find('.js-calendar__apply');
    this.$clear = this.$node.find('.js-calendar__clear');
    this.$button = this.$node.find('.js-calendar__inputs button');
    this.$menu = this.$node.find('.js-calendar__menu');
    this.$nodeForDatepicker = this.$node.find('.js-calendar__datepicker');
  }

  _addValueToInputs() {
    this.$inputs.each((i) => {
      this.$inputs[i].value = 'ДД.ММ.ГГГГ';
    });
  }

  _initDatepicker() {
    const calendarOptions = {
      range: true,
      navTitles: {
        days: 'MM yyyy',
      },
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      minDate: new Date(),
    };

    this.datepicker = this.$nodeForDatepicker.datepicker(calendarOptions).data().datepicker;
  }

  _attachEventsHandler() {
    this.$apply.on('click', () => {
      this._applyDates();
    });
    this.$clear.on('click', () => {
      this._clearDates();
    });
    this.$button.on('click', () => {
      this._toggleVisible();
    });
  }

  _applyDates() {
    const dates = this.datepicker.selectedDates;

    if (dates.length !== 2) {
      return;
    }

    if (this.$inputs.length === 2) {
      const firstDate = this._calculateFullDate(dates[0]);
      const secondDate = this._calculateFullDate(dates[1]);

      this.$inputs[0].value = firstDate;
      this.$inputs[1].value = secondDate;
      this._toggleVisible();
      return;
    }

    const firstDate = this._calculateDayAndMount(dates[0]);
    const secondDate = this._calculateDayAndMount(dates[1]);

    this.$inputs[0].value = `${firstDate} - ${secondDate}`;
    this._toggleVisible();
  }

  _calculateFullDate(date) {
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
    this.datepicker.clear();
  }

  _toggleVisible() {
    this.$menu.toggleClass('calendar__menu__visible');
  }

  _calculateDayAndMount(date) {
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

$(() => {
  $('.js-calendar').each((i, node) => {
    new Calendar($(node));
  });
});
