import EventEmitter from '@helpers/EventEmitter';

import { Dates, MaskedType } from '../../types';
import {
  deleteIncompleteDate,
  isNumber,
  removeDate,
  updateDates,
} from './methods';

class Model {
  private eventEmitter: EventEmitter;

  private dates: Dates = [{ day: '', month: '', year: '' }];

  private type: MaskedType;

  constructor(eventEmitter: EventEmitter, type: MaskedType) {
    this.eventEmitter = eventEmitter;

    this.type = type;

    this.init(type);
  }

  public getDates() {
    return this.dates;
  }

  public fixData() {
    this.dates = deleteIncompleteDate(this.type, this.dates);

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });

    return this;
  }

  public setDates(dates: Dates) {
    this.dates = dates;

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });

    return this;
  }

  public updateData(data: string) {
    data.split('').forEach((value) => {
      if (isNumber(value)) {
        this.updateDates(Number(value));
      }
    });

    return this;
  }

  private updateDates(data?: number) {
    this.dates = updateDates(this.type, this.dates, data);

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });

    return this;
  }

  public removeDate() {
    this.dates = removeDate(this.type, this.dates);

    this.eventEmitter.emit({
      eventName: 'UpdatedDates',
      eventArguments: { dates: this.dates },
    });

    return this;
  }

  private init(type: MaskedType) {
    if (type === 'dates') {
      this.dates.push({ day: '', month: '', year: '' });
    }

    return this;
  }
}

export default Model;
