class TextField {
  constructor(node) {
    this.node = node;

    this._init();
  }

  _init() {
    const { maskedType } = this.node.dataset;

    this.type = maskedType;
    this._attachEventsHandler();
    this.node.dataset.date = maskedType === 'double' ? ',' : '';
  }

  _attachEventsHandler() {
    this.node.addEventListener('focus', this._onFocus.bind(this));
    this.node.addEventListener('keydown', this._onKeyDown.bind(this));
    this.node.addEventListener('blur', this._onBlur.bind(this));
    this.node.addEventListener('update', this._update.bind(this));
  }

  _update() {
    this.dates = this.node.dataset.date.split(',');

    if (this.dates[0] === '') {
      this.node.value = '';
      return;
    }

    if (this.type === 'single') {
      this._displayDate(this.dates);
    }

    if (this.type === 'double') {
      let [firstDate, secondDate] = this.dates;

      firstDate = this.constructor._calculateDayAndMount(firstDate);
      secondDate = this.constructor._calculateDayAndMount(secondDate);

      this.node.value = `${firstDate} - ${secondDate}`;
    }
  }

  _onBlur() {
    if (TextField._isFullDate(this.dates)) {
      this._update();
      return;
    }

    this.dates = this.type === 'double' ? ',' : '';
    this.node.value = '';
    this.node.dataset.date = this.dates;
  }

  static _isFullDate(dates) {
    return dates.reduce((sum, current) => current.length === 10 && sum, true);
  }

  static _calculateDayAndMount(checkedDate) {
    const [day, month, year] = checkedDate.split('.').map((value, index) => {
      if (index === 1) {
        return Number(value) - 1;
      }
      return Number(value);
    });

    const monthNames = [
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

    const date = new Date(year, month, day);

    const monthNumber = date.getMonth();

    const monthName = monthNames[monthNumber];

    return `${day} ${monthName}`;
  }

  _setDates() {
    this.node.dataset.date = this.dates.join(',');
  }

  _onFocus() {
    this.dates = this.node.dataset.date.split(',');
    this._displayDate(this.dates);
  }

  _onKeyDown(event) {
    if (event.key === 'Tab') {
      return;
    }

    event.preventDefault();

    if (event.key === 'Backspace') {
      this.dates = this._removeDate(this.dates);

      this._displayDate(this.dates);
      return;
    }

    if (!this.constructor._isNumber(event.key)) {
      return;
    }

    const key = Number(event.key);

    if (this.type === 'double') {
      let [firstDate, secondDate] = this.dates;

      if (firstDate.length < 10) {
        firstDate = this._calculateDay(firstDate, key);
      } else {
        secondDate = this._calculateDay(secondDate, key);
      }

      this.dates = [firstDate, secondDate];

      this._displayDate(this.dates);
      return;
    }

    const date = this._calculateDay(this.dates[0], key);
    this.dates = [date];
    this._displayDate(this.dates);
  }

  static _isNumber(key) {
    return /^\d$/.test(key);
  }

  _calculateDay(date, key) {
    const [day] = date.split('.');

    if (day.length === 2) {
      return this._calculateMonth(date, key);
    }

    if (day.length === 1) {
      if (day[0] === '0' && key === 0) {
        return date + '1';
      }

      if (day[0] === '3' && key > 0) {
        return date + '1';
      }

      return date + String(key);
    }

    if (key > 3) {
      return date + '0' + String(key);
    }

    return date + String(key);
  }

  _calculateMonth(date, key) {
    const [day, month] = date.split('.');

    if (typeof month === 'undefined') {
      if (Number(day) > 29 && key === 2) {
        return day + '.' + month;
      }

      if (key > 1) {
        return day + '.' + '0' + String(key);
      }

      return day + '.' + String(key);
    }

    if (month.length === 2) {
      return this._calculateYear(date, key);
    }

    if (Number(day) > 29 && key === 2) {
      return day + '.' + month;
    }

    if (month[0] === '0' && key === 0) {
      return day + '.' + month + '1';
    }

    if (month[0] === '1' && key > 2) {
      return day + '.' + month + '2';
    }

    return day + '.' + month + String(key);
  }

  _calculateYear(date, key) {
    const [day, month, year] = date.split('.');

    if (typeof year === 'undefined') {
      return day + '.' + month + '.' + String(key);
    }

    if (year.length === 4) {
      return date;
    }

    if (year.length === 3) {
      if (this.constructor._isValidDate(date + String(key))) {
        return date + String(key);
      }

      return date;
    }

    return day + '.' + month + '.' + year + String(key);
  }

  static _isValidDate(checkedDate) {
    const [day, month, year] = checkedDate.split('.').map((value, index) => {
      if (index === 1) {
        return Number(value) - 1;
      }
      return Number(value);
    });
    const date = new Date(year, month, day);

    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  _removeDate(dates) {
    const newDates = dates
      .join('-')
      .replace(/-$/, '')
      .slice(0, -1)
      .replace(/-\.$|-$|\.$/, '')
      .split('-');

    if (this.type === 'double') {
      return [...newDates, ''].slice(0, 2);
    }

    return newDates;
  }

  _displayDate(dates) {
    const mask = '__.__.____';

    const values = [];
    dates.forEach((date) => {
      if (typeof date === 'undefined') {
        values.push(mask);
        return;
      }

      values.push(date + mask.slice(date.length));
    });

    this.node.value = values.join(' - ');

    this._setDates();
  }
}

export default TextField;
