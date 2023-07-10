import { EventEmitter } from '@helpers/EventEmitter';

import { Dates, MaskedType, ModelEvents } from '../../types';
import {
  deleteIncompleteDate,
  isNumber,
  removeDate,
  updateDates,
} from './methods';

class Model extends EventEmitter<ModelEvents> {
  private dates: Dates = [{ day: '', month: '', year: '' }];

  private type: MaskedType;

  constructor(type: MaskedType) {
    super();

    this.type = type;

    this.init(type);
  }

  public getDates() {
    return this.dates;
  }

  public fixData() {
    this.dates = deleteIncompleteDate(this.type, this.dates);

    this.emit('UpdateDates', { dates: this.dates });

    return this;
  }

  public setDates(dates: Dates) {
    this.dates = dates;

    this.emit('UpdateDates', { dates: this.dates });

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

    this.emit('UpdateDates', { dates: this.dates });

    return this;
  }

  public removeDate() {
    this.dates = removeDate(this.type, this.dates);

    this.emit('UpdateDates', { dates: this.dates });

    return this;
  }

  private init(type: MaskedType) {
    if (type === 'dates') {
      this.dates = [...this.dates, { day: '', month: '', year: '' }];
    }

    return this;
  }
}

export { Model };
