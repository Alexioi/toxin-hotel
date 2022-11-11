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
    if (this.node.value === '') {
      this.date = {
        day: [],
        month: [],
        year: [],
      };
      return;
    }

    const [day, month, year] = this.node.value.split('.');

    this.date = {
      day: day.split(''),
      month: month.split(''),
      year: year.split(''),
    };
  }

  _onKeyDown(event) {
    if (event.key === 'Tab') {
      return;
    }

    event.preventDefault();

    if (event.key === 'Backspace') {
      this.constructor._removeDate(this.date, event.key);
      this._displayDate();
      return;
    }

    if (!this.constructor._isNumber(event.key)) {
      return;
    }

    const key = Number(event.key);

    this._calculateDay(this.date, key);
    this._displayDate();
  }

  static _isNumber(key) {
    return /^\d$/.test(key);
  }

  _calculateDay(date, key) {
    const { day } = date;

    if (day.length === 2) {
      this._calculateMonth(date, key);
      return;
    }

    if (day.length === 1) {
      if (day[0] === 0 && key === 0) {
        day.push(1);
        return;
      }

      if (day[0] === 3 && key > 0) {
        day.push(1);
        return;
      }

      day.push(key);
      return;
    }

    if (key > 3) {
      day.push(0);
      day.push(key);
      return;
    }

    day.push(key);
  }

  _calculateMonth(date, key) {
    const { day, month } = date;

    if (month.length === 2) {
      this._calculateYear(date, key);
      return;
    }

    if (month.length === 1) {
      if (Number(day.join('')) > 29 && key === 2) {
        return;
      }

      if (month[0] === 0 && key === 0) {
        month.push(1);
        return;
      }

      if (month[0] === 1 && key > 2) {
        month.push(2);
        return;
      }

      month.push(key);
      return;
    }

    if (Number(day.join('')) > 29 && key === 2) {
      return;
    }

    if (key > 1) {
      month.push(0);
      month.push(key);
      return;
    }

    month.push(key);
  }

  _calculateYear(date, key) {
    const { year } = date;

    if (year.length === 4) {
      return;
    }

    if (year.length === 3) {
      if (this._isValidDate(key)) {
        year.push(key);
        return;
      }
      return;
    }

    year.push(key);
  }

  _isValidDate(key) {
    const day = Number(this.date.day.join(''));
    const month = Number(this.date.month.join('')) - 1;
    const year = Number(this.date.year.join('') + String(key));

    const date = new Date(year, month, day);

    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  static _removeDate(date) {
    const { day, month, year } = date;

    if (year.length > 0) {
      year.pop();
      return;
    }

    if (month.length > 0) {
      month.pop();
      return;
    }

    if (day.length > 0) {
      day.pop();
    }
  }

  _displayDate() {
    const day = this.constructor._getPlaceholder(this.date.day, 2);
    const month = this.constructor._getPlaceholder(this.date.month, 2);
    const year = this.constructor._getPlaceholder(this.date.year, 4);

    this.node.value = `${day}.${month}.${year}`;
  }

  static _getPlaceholder(date, length) {
    return [...date, '_', '_', '_', '_'].join('').slice(0, length);
  }
}

export default TextField;
