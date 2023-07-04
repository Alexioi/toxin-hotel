import EventEmitter from '@helpers/EventEmitter';

import View from '../View';
import Model from '../Model';

class Presenter {
  private eventEmitter: EventEmitter;

  private view: View;

  private model: Model;

  constructor(view: View, model: Model, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;

    this.view = view;
    this.model = model;

    this.attachEventEmittersToModel().attachEventEmittersToView().init();
  }

  private init() {
    this.model.emitValue();
    return this;
  }

  private attachEventEmittersToModel() {
    const notifyModelAboutDecrementCounter = (index: number) => {
      this.model.decrementCounter(index);
    };

    const notifyModelAboutIncrementCounter = (index: number) => {
      this.model.incrementCounter(index);
    };

    const getValue = () => {
      this.model.emitValue();
    };

    const notifyModelAboutClearCounters = () => {
      this.model.resetCounters();
    };

    this.eventEmitter.subscribe(
      'IncrementCounter',
      // @ts-ignore
      notifyModelAboutIncrementCounter,
    );

    this.eventEmitter.subscribe(
      'DecrementCounter',
      // @ts-ignore
      notifyModelAboutDecrementCounter,
    );
    this.eventEmitter.subscribe('ApplyDropdownData', getValue);
    this.eventEmitter.subscribe('ClearCounters', notifyModelAboutClearCounters);

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

    const notifyViewUpdatedValue = (value: string): void => {
      this.view.updateInputValue(value);
    };

    // @ts-ignore
    this.eventEmitter.subscribe('UpdateCounters', notifyViewUpdatedCounters);
    // @ts-ignore
    this.eventEmitter.subscribe('UpdateValue', notifyViewUpdatedValue);

    return this;
  }
}

export default Presenter;
