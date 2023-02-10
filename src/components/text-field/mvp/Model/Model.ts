import EventEmitter from '../../../../helpers/EventEmitter';

import { date, dates, maskedType } from '../../types';

type data = {
  dates: dates;
};

class Model {
  private eventEmitter: EventEmitter;

  private data: data = { dates: [] };

  constructor(eventEmitter: EventEmitter, type: maskedType) {
    this.eventEmitter = eventEmitter;

    this.init(type);
  }

  public updateDates(data?: number) {
    if (data === null) {
      this.eventEmitter.emit({
        eventName: 'UpdatedDates',
        eventArguments: { dates: this.data.dates },
      });
      return;
    }

    const numberData = Number(data);

    const [from, to] = this.data.dates;

    if (typeof to !== 'undefined') {
      if (from.year.length !== 4) {
        const newFrom = this._calculateDay(from, numberData);

        this.data.dates = [newFrom, to];
      } else {
        const newTo = this._calculateDay(to, numberData);

        this.data.dates = [from, newTo];
      }
    } else {
      const newFrom = this._calculateDay(from, numberData);

      this.data.dates = [newFrom];
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.data.dates },
    });
  }

  public removeDate() {
    const [from, to] = this.data.dates;

    if (this.data.dates.length === 2) {
      if (from.year.length === 4) {
        const newTo = this.removeLastSymbolInDate(from);

        this.data.dates = [from, newTo];
      } else {
        const newFrom = this.removeLastSymbolInDate(from);

        this.data.dates = [newFrom, to];
      }
    } else {
      const newFrom = this.removeLastSymbolInDate(from);

      this.data.dates = [newFrom];
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.data.dates },
    });
  }

  private removeLastSymbolInDate(date: date): date {
    const { day, month, year } = date;

    if (year.length > 0) {
      const newYear = year.slice(0, -1);

      return { day, month, year: newYear };
    }

    if (month.length > 0) {
      const newMonth = month.slice(0, -1);

      return { day, month: newMonth, year };
    }

    const newDay = day.slice(0, -1);

    return { day: newDay, month, year };
  }

  _calculateDay(date: date, key: number): date {
    const { day, month, year } = date;

    if (day.length === 2) {
      return this._calculateMonth(date, key);
    }

    if (day.length === 1) {
      if (day[0] === '0' && key === 0) {
        const newDay = `${day}1`;

        return { day: newDay, month, year };
      }

      if (day[0] === '3' && key > 0) {
        const newDay = `${day}1`;

        return { day: newDay, month, year };
      }

      const newDay = day + String(key);
      return { day: newDay, month, year };
    }

    if (key > 3) {
      const newDay = `${day}0${key}`;

      return { day: newDay, month, year };
    }

    const newDay = day + String(key);
    return { day: newDay, month, year };
  }

  _calculateMonth(date: date, key: number): date {
    const { day, month, year } = date;

    if (month === '') {
      if (Number(day) > 29 && key === 2) {
        return { day, month, year };
      }

      if (key > 1) {
        const newMonth = `0${key}`;

        return { day, month: newMonth, year };
      }

      const newMonth = `${key}`;

      return { day, month: newMonth, year };
    }

    if (month.length === 2) {
      return this._calculateYear(date, key);
    }

    if (Number(day) > 29 && key === 2) {
      return { day, month, year };
    }

    if (month[0] === '0' && key === 0) {
      const newMonth = `${key}1`;

      return { day, month: newMonth, year };
    }

    if (month[0] === '1' && key > 2) {
      const newMonth = `${key}2`;

      return { day, month: newMonth, year };
    }

    const newMonth = `${month}${key}`;

    return { day, month: newMonth, year };
  }

  _calculateYear(date: date, key: number): date {
    const { day, month, year } = date;

    if (year === '') {
      const newYear = `${key}`;

      return { day, month, year: newYear };
    }

    if (year.length === 4) {
      return date;
    }

    if (year.length === 3) {
      //   if (Model._isValidDate(date, key)) {
      return { day, month, year: `${year}${key}` };
      //   }

      return date;
    }

    const newYear = `${year}${key}`;

    return { day, month, year: newYear };
  }

  static _isValidDate(checkedDate: date, key: number) {
    const { day, month, year } = checkedDate;

    const currentDate = new Date(
      Number(`${year}${key}`),
      Number(month),
      Number(day),
    );

    const dateYear = String(currentDate.getFullYear());
    const dateMonth = String(currentDate.getMonth());
    const dateDay = String(currentDate.getDate());

    return dateYear === year && dateMonth === month && dateDay === day;
  }

  private init(type: maskedType) {
    if (type === 'single') {
      this.data.dates.push({ day: '', month: '', year: '' });
    }

    if (type === 'double') {
      this.data.dates.push({ day: '', month: '', year: '' });
      this.data.dates.push({ day: '', month: '', year: '' });
    }

    console.log(this.data);
  }
}

export default Model;
