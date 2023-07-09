import { Data, Dates, TextFieldEventEmitter } from '../../types';
import Model from '../Model';
import View from '../View';

class Presenter {
  private eventEmitter: TextFieldEventEmitter;

  private view: View;

  private model: Model;

  constructor(view: View, model: Model, eventEmitter: TextFieldEventEmitter) {
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
    const notifyModel = ({ data }: { data: string }) => {
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

    this.eventEmitter.subscribe('UpdateDates', notifyViewUpdatedModelOptions);

    return this;
  }
}

export default Presenter;
