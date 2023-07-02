import EventEmitter from '@helpers/EventEmitter';

import { Dates, Data } from '../../types';
import Model from '../Model/Model';
import View from '../View/View';

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

    this.eventEmitter.subscribe('InputData', notifyModel);

    this.eventEmitter.subscribe('TouchInput', getData);

    this.eventEmitter.subscribe('DeleteData', notifyModelDelete);

    this.eventEmitter.subscribe('BlurInput', fixData);

    return this;
  }

  private attachEventEmittersToView() {
    const notifyViewUpdatedModelOptions = ({ dates }: Data): void => {
      this.view.displayDate(dates);
    };

    this.eventEmitter.subscribe('UpdatedDates', notifyViewUpdatedModelOptions);

    return this;
  }
}

export default Presenter;
