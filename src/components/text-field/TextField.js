class TextField {
  constructor(node) {
    this.node = node;

    this._init();
  }

  _init() {
    this._attachEventsHandler();
  }

  _attachEventsHandler() {
    this.node.addEventListener('focus', this._onFocus.bind(this));
    this.node.addEventListener('keydown', this._onKeyDown.bind(this));
  }

  _onFocus() {
    this.date = '';
    this._displayDate(this.date);
  }

  _onKeyDown(event) {
    if (event.key === 'Tab') {
      return;
    }

    event.preventDefault();

    if (event.key === 'Backspace') {
      this.date = this.constructor._removeDate(this.date, event.key);
      this._displayDate(this.date);
      return;
    }

    if (!this.constructor._isNumber(event.key)) {
      return;
    }

    const key = Number(event.key);

    this.date = this._calculateDay(this.date, key);
    this._displayDate(this.date);
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

  static _removeDate(date) {
    if (date[date.length - 1] === '.') {
      return date.slice(0, -2);
    }

    return date.slice(0, -1);
  }

  _displayDate(date) {
    const mask = '__.__.____';

    this.node.value = date + mask.slice(date.length);
  }
}

export default TextField;
