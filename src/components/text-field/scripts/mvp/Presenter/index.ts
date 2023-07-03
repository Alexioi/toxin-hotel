import EventEmitter from '@helpers/EventEmitter';

import { Dates, Data } from '../../types';
import Model from '../Model';
import View from '../View';

class Presenter {
  private eventEmitter: EventEmitter;

  private view: View;

  private model: Model;

  constructor(view: View, model: Model, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;

    this.view = view;
    this.model = model;
    this.attachEventEmittersToModel().attachEventEmittersToView();
  }

  public setDates(dates: Dates) {
    this.model.setDates(dates);
  }

  public getDates() {
    return this.model.getDates();
  }

  private attachEventEmittersToModel() {
    const notifyModel = (data: string) => {
      this.model.updateData(data);
    };

    const notifyModelDelete = () => {
      this.model.removeDate();
    };

    const getData = () => {
      const dates = this.getDates();

      this.view.displayDate(dates);
    };

    const fixData = () => {
      this.model.fixData();
    };

    this.eventEmitter.subscribe({
      eventName: 'InputData',
      callback: notifyModel,
    });

    this.eventEmitter.subscribe({
      eventName: 'TouchInput',
      callback: getData,
    });

    this.eventEmitter.subscribe({
      eventName: 'DeleteData',
      callback: notifyModelDelete,
    });

    this.eventEmitter.subscribe({
      eventName: 'BlurInput',
      callback: fixData,
    });

    return this;
  }

  private attachEventEmittersToView() {
    const notifyViewUpdatedModelOptions = ({ dates }: Data): void => {
      this.view.displayDate(dates);
    };

    this.eventEmitter.subscribe({
      eventName: 'UpdateDates',
      callback: notifyViewUpdatedModelOptions,
    });

    return this;
  }
}

export default Presenter;
