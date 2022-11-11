class TextField {
  constructor(node) {
    this.node = node;

    this._init();
  }

  _init() {
    this.node.addEventListener('focus', (event) => {
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
    });

    this.node.addEventListener('keydown', (event) => {
      event.preventDefault();

      this._removeDate(event.key);

      if (!/^\d$/.test(event.key)) {
        return;
      }

      const key = Number(event.key);

      this._calculateDay(key);
    });
  }

  _calculateDay(key) {
    const { day } = this.date;

    if (day.length === 2) {
      this._calculateMonth(key);
      return;
    }

    if (day.length === 1) {
      if (day[0] === 0 && key === 0) {
        day.push(1);
        this._displayDate();
        return;
      }

      if (day[0] === 3 && key > 0) {
        day.push(1);
        this._displayDate();
        return;
      }

      day.push(key);
      this._displayDate();
      return;
    }

    if (key > 3) {
      day.push(0);
      day.push(key);
      this._displayDate();
      return;
    }

    day.push(key);
    this._displayDate();
  }

  _calculateMonth(key) {
    const { day, month } = this.date;

    if (month.length === 2) {
      this._calculateYear(key);
      return;
    }

    if (month.length === 1) {
      if (Number(day.join('')) > 29 && key === 2) {
        return;
      }

      if (month[0] === 0 && key === 0) {
        month.push(1);
        this._displayDate();
        return;
      }

      if (month[0] === 1 && key > 2) {
        month.push(2);
        this._displayDate();
        return;
      }

      month.push(key);
      this._displayDate();
      return;
    }

    if (Number(day.join('')) > 29 && key === 2) {
      return;
    }

    if (key > 1) {
      month.push(0);
      month.push(key);
      this._displayDate();
      return;
    }

    month.push(key);
    this._displayDate();
    return;
  }

  _calculateYear(key) {
    const { year } = this.date;

    if (year.length === 4) {
      return;
    }

    if (year.length === 3) {
      if (this._isValidDate(key)) {
        year.push(key);
        this._displayDate();
        return;
      }
      return;
    }

    year.push(key);
    this._displayDate();
    return;
  }

  _isValidDate(key) {
    const day = Number(this.date.day.join(''));
    const month = Number(this.date.month.join('')) - 1;
    const year = Number(this.date.year.join('') + String(key));

    const date = new Date(year, month, day);

    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  _removeDate(key) {
    const { day, month, year } = this.date;

    if (key === 'Backspace') {
      if (year.length > 0) {
        year.pop();
        this._displayDate();
        return;
      }

      if (month.length > 0) {
        month.pop();
        this._displayDate();
        return;
      }

      if (day.length > 0) {
        day.pop();
        this._displayDate();
      }
    }
  }

  _displayDate() {
    const day = this._getPlaceholder(this.date.day, 2);
    const month = this._getPlaceholder(this.date.month, 2);
    const year = this._getPlaceholder(this.date.year, 4);

    this.node.value = `${day}.${month}.${year}`;
  }

  _getPlaceholder(date, length) {
    return [...date, '_', '_', '_', '_'].join('').slice(0, length);
  }

  _attachEventsHandler() {}
}

export default TextField;
