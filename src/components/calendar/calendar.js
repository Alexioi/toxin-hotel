import 'air-datepicker';

const calendarOptions = {
  range: true,
  navTitles: {
    days: 'MM yyyy',
  },
  prevHtml: '<span class="material-icons">arrow_back</span>',
  nextHtml: '<span class="material-icons">arrow_forward</span>',
  minDate: new Date(),
};

class Calendar {
  constructor($node) {
    this.$node = $node;
    this.$inputs = $node.find('input');
    this.$apply = $node.find('.calendar__apply');
    this.$cancel = $node.find('.calendar__cancel');
    this.$button = $node.find('.calendar__inputs button');
    this.$card = $node.find('.calendar__card');

    this._init();
    this._initDatepiker();

    this._attachEventsHandler();
  }

  _init() {
    this.$inputs.each((i) => {
      this.$inputs[i].value = 'дд.мм.гггг';
    });
  }

  _attachEventsHandler() {
    this.$apply.on('click', () => {
      this._applyDate();
    });
    this.$cancel.on('click', () => {
      this._clearDate();
    });
    this.$button.on('click', () => {
      this._toggleVisible();
    });
  }

  _initDatepiker() {
    const $datepicker = this.$node.find('.js-calendar__datepicker');

    this.datepicker = $datepicker.datepicker(calendarOptions).data().datepicker;
  }

  _applyDate() {
    const dates = this.datepicker.selectedDates;

    if (dates.length !== 2) {
      return;
    }

    if (this.$inputs.length === 2) {
      const date0 = this._calculateDate(dates[0]);
      const date1 = this._calculateDate(dates[1]);

      this.$inputs[0].value = date0;
      this.$inputs[1].value = date1;
      this._toggleVisible();
      return;
    }

    const date0 = this._calculateDayAndMount(dates[0]);
    const date1 = this._calculateDayAndMount(dates[1]);

    this.$inputs[0].value = date0 + ' - ' + date1;
    this._toggleVisible();
  }

  _calculateDate(date) {
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    const year = String(date.getFullYear());

    if (day.length !== 2) {
      day = '0' + day;
    }

    if (month.length !== 2) {
      month = '0' + month;
    }

    return day + '.' + month + '.' + year;
  }

  _clearDate() {
    this.datepicker.clear();
  }

  _toggleVisible() {
    this.$card.toggleClass('calendar__card__visible');
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

    const day = String(date.getDate());
    const monthNumber = date.getMonth();

    const month = namesOfMonth[monthNumber];

    return day + ' ' + month;
  }
}

$('.js-calendar').each((i, node) => {
  new Calendar($(node));
});
