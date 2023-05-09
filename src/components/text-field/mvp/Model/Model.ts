import EventEmitter from '../../../../helpers/EventEmitter';

import { date, dates, maskedType } from '../../types';

import { calculateDay } from './methods';

type data = {
  dates: dates;
  text: string;
};

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

  private data: data = { dates: [], text: '' };

  private type: maskedType;

  constructor(eventEmitter: EventEmitter, type: maskedType) {
    this.eventEmitter = eventEmitter;

    this.type = type;

    this.init(type);
  }

  public updateData(data: string) {
    if (this.type === 'text') {
      this.data.text = this.data.text + data;
      this.eventEmitter.emit({
        eventName: 'UpdatedDates',
        eventArguments: { data: this.data },
      });
    } else {
      if (typeof data !== 'undefined') {
        data.split('').forEach((value) => {
          if (this.isNumber(value)) {
            this.updateDates(Number(value));
          }
        });
      }
    }
  }

  private updateDates(data?: number) {
    if (data === null) {
      this.eventEmitter.emit({
        eventName: 'UpdatedDates',
        eventArguments: { data: this.data },
      });
      return;
    }

    if (this.type === 'text') {
      this.data.text = this.data.text + data;
    }

    const numberData = Number(data);

    if (this.type === 'date') {
      const [date] = this.data.dates;

      const newFrom = calculateDay(date, numberData);

      this.data.dates = [newFrom];
    }

    if (this.type === 'dates') {
      const [from, to] = this.data.dates;

      if (from.year.length !== 4) {
        const newFrom = calculateDay(from, numberData);

        this.data.dates = [newFrom, to];
      } else {
        const newTo = calculateDay(to, numberData);

        this.data.dates = [from, newTo];
      }
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { data: this.data },
    });
  }

  public removeDate() {
    if (this.type === 'text') {
      this.data.text = this.data.text.slice(0, -1);
    }

    if (this.type === 'date') {
      const [date] = this.data.dates;

      const newDate = removeLastSymbol(date);

      this.data.dates = [newDate];
    }

    if (this.type === 'dates') {
      const [from, to] = this.data.dates;

      if (to.day.length !== 0) {
        const newTo = removeLastSymbol(to);

        this.data.dates = [from, newTo];
      } else {
        const newFrom = removeLastSymbol(from);

        this.data.dates = [newFrom, to];
      }
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { data: this.data },
    });
  }

  private init(type: maskedType) {
    if (type === 'text') {
      this.data.text = '';
    }

    if (type === 'date') {
      this.data.dates.push({ day: '', month: '', year: '' });
    }

    if (type === 'dates') {
      this.data.dates.push({ day: '', month: '', year: '' });
      this.data.dates.push({ day: '', month: '', year: '' });
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
