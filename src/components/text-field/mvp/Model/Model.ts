import EventEmitter from '../../../../helpers/EventEmitter';

import { date, dates, maskedType } from '../../types';

import { calculateDay } from './methods';

const removeLastSymbol = (date: date): date => {
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
};

class Model {
  private eventEmitter: EventEmitter;

  private dates: dates = [{ day: '', month: '', year: '' }];

  private type: maskedType;

  constructor(eventEmitter: EventEmitter, type: maskedType) {
    this.eventEmitter = eventEmitter;

    this.type = type;

    this.init(type);
  }

  public getDates() {
    return this.dates;
  }

  public fixData() {
    if (this.type === 'date') {
      const [date] = this.dates;
      if (date.year.length !== 4) {
        this.dates = [{ day: '', month: '', year: '' }];
      }
    }

    if (this.type === 'dates') {
      const [from, to] = this.dates;

      if (to.year.length !== 4) {
        this.dates = [
          { day: '', month: '', year: '' },
          { day: '', month: '', year: '' },
        ];
      }
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });
  }

  public setDates(dates: dates) {
    this.dates = dates;
    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });
  }

  public updateData(data: string) {
    data.split('').forEach((value) => {
      if (this.isNumber(value)) {
        this.updateDates(Number(value));
      } else {
        this.eventEmitter.emit({
          eventName: 'UpdatedDates',
          eventArguments: { dates: this.dates },
        });
      }
    });
  }

  private updateDates(data?: number) {
    if (data === null) {
      this.eventEmitter.emit({
        eventName: 'UpdatedDates',
        eventArguments: { dates: this.dates },
      });
      return;
    }

    const numberData = Number(data);

    if (this.type === 'date') {
      const [date] = this.dates;

      const newFrom = calculateDay(date, numberData);

      this.dates = [newFrom];
    }

    if (this.type === 'dates') {
      const [from, to] = this.dates;

      if (from.year.length !== 4) {
        const newFrom = calculateDay(from, numberData);

        this.dates = [newFrom, to];
      } else {
        const newTo = calculateDay(to, numberData);

        this.dates = [from, newTo];
      }
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });
  }

  public removeDate() {
    if (this.type === 'date') {
      const [date] = this.dates;

      const newDate = removeLastSymbol(date);

      this.dates = [newDate];
    }

    if (this.type === 'dates') {
      const [from, to] = this.dates;

      if (to.day.length !== 0) {
        const newTo = removeLastSymbol(to);

        this.dates = [from, newTo];
      } else {
        const newFrom = removeLastSymbol(from);

        this.dates = [newFrom, to];
      }
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });
  }

  private init(type: maskedType) {
    if (type === 'dates') {
      this.dates.push({ day: '', month: '', year: '' });
    }
  }

  private isNumber(key: string | null): boolean {
    if (key === null) {
      return false;
    }

    return /^\d$/.test(key);
  }
}

export default Model;
