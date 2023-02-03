import EventEmitter from '../../../../helpers/EventEmitter';
import { dates } from '../../types';

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

  private attachEventEmittersToModel(): void {
    const notifyModel = (data: number) => {
      this.model.updateDates(data);
    };

    const notifyModelDelete = () => {
      console.log('2');
      this.model.removeDate();
    };

    this.eventEmitter.subscribe('InputData', notifyModel);

    this.eventEmitter.subscribe('TouchInput', notifyModel);

    this.eventEmitter.subscribe('DeleteData', notifyModelDelete);
  }

  private attachEventEmittersToView(): void {
    const notifyViewUpdatedModelOptions = (dates: dates): void => {
      // @ts-ignore
      this.view.displayDate(dates);
    };

    this.eventEmitter.subscribe('UpdatedDates', notifyViewUpdatedModelOptions);
  }
}

export default Presenter;
