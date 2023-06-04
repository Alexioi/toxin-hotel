import EventEmitter from 'src/helpers/EventEmitter';
import View from '../View/View';
import Model from '../Model/Model';

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

  private attachEventEmittersToModel() {
    const notifyModelAboutDecrementCounter = ({ index }: { index: number }) => {
      this.model.decrementCounter(index);
    };

    const notifyModelAboutIncrementCounter = ({ index }: { index: number }) => {
      this.model.incrementCounter(index);
    };

    this.eventEmitter.subscribe(
      'IncrementCounter',
      notifyModelAboutIncrementCounter,
    );
    this.eventEmitter.subscribe(
      'DecrementCounter',
      notifyModelAboutDecrementCounter,
    );

    return this;
  }

  private attachEventEmittersToView() {
    const notifyViewUpdatedCounters = ({
      counters,
      value,
    }: {
      counters: number[];
      value: string;
    }): void => {
      this.view.update(counters, value);
    };

    this.eventEmitter.subscribe('UpdateCounters', notifyViewUpdatedCounters);

    return this;
  }
}

export default Presenter;
