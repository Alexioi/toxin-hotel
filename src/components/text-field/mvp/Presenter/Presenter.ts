import EventEmitter from '../../../../helpers/EventEmitter';
import { data } from '../../types';

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
    this.attachEventEmittersToModel();
    this.attachEventEmittersToView();
  }

  public setData(data: string) {
    // @ts-ignore
    this.model.updateDates(data);
  }

  private attachEventEmittersToModel(): void {
    const notifyModel = (data: string) => {
      this.model.updateData(data);
    };

    const notifyModelDelete = () => {
      this.model.removeDate();
    };

    this.eventEmitter.subscribe('InputData', notifyModel);

    this.eventEmitter.subscribe('TouchInput', notifyModel);

    this.eventEmitter.subscribe('DeleteData', notifyModelDelete);
  }

  private attachEventEmittersToView(): void {
    const notifyViewUpdatedModelOptions = ({ data }: { data: data }): void => {
      console.log(data);
      this.view.displayDate(data);
    };

    this.eventEmitter.subscribe('UpdatedDates', notifyViewUpdatedModelOptions);
  }
}

export default Presenter;
