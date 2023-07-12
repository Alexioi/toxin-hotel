import { EventEmitter } from '@helpers/EventEmitter';

import { Dates, MaskedType, ModelEvents } from '../../types';
import {
  deleteIncompleteDate,
  init,
  isNumber,
  removeDate,
  updateDates,
} from './methods';

class Model extends EventEmitter<ModelEvents> {
  private props: {
    dates: Dates;
    type: MaskedType;
  };

  constructor(type: MaskedType) {
    super();

    const { props } = init(type);

    this.props = props;
  }

  public getDates() {
    return this.props.dates;
  }

  public fixData() {
    const { type, dates } = this.props;

    const newDates = deleteIncompleteDate(type, dates);

    this.props = { type, dates: newDates };

    this.emit('UpdateDates', { dates: newDates });

    return this;
  }

  public setDates(dates: Dates) {
    const { type } = this.props;

    this.props = { type, dates };

    this.emit('UpdateDates', { dates });

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

  public removeDate() {
    const { type, dates } = this.props;

    const newDates = removeDate(type, dates);

    this.props = { type, dates: newDates };

    this.emit('UpdateDates', { dates: newDates });

    return this;
  }

  private updateDates(data?: number) {
    const { type, dates } = this.props;

    const newDates = updateDates(type, dates, data);

    this.props = { type, dates: newDates };

    this.emit('UpdateDates', { dates: newDates });

    return this;
  }
}

export { Model };
