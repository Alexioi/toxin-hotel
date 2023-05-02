import EventEmitter from '../../../../helpers/EventEmitter';

import { date, dates, maskedType } from '../../types';

import { calculateDay } from './methods';

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
        const newFrom = calculateDay(from, numberData);

        this.data.dates = [newFrom, to];
      } else {
        const newTo = calculateDay(to, numberData);

        this.data.dates = [from, newTo];
      }
    } else {
      const newFrom = calculateDay(from, numberData);

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
      if (to.day.length !== 0) {
        const newTo = this.removeLastSymbolInDate(to);

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

  private init(type: maskedType) {
    if (type === 'single') {
      this.data.dates.push({ day: '', month: '', year: '' });
    }

    if (type === 'double') {
      this.data.dates.push({ day: '', month: '', year: '' });
      this.data.dates.push({ day: '', month: '', year: '' });
    }
  }
}

export default Model;
