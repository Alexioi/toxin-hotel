import { View } from '../View';
import { Model } from '../Model';

class Presenter {
  private view: View;

  private model: Model;

  constructor(view: View, model: Model) {
    this.view = view;
    this.model = model;

    this.attachEventEmittersToModel().attachEventEmittersToView().init();
  }

  private init() {
    this.model.emitValue();
    return this;
  }

  private attachEventEmittersToModel() {
    const notifyModelAboutDecrementCounter = ({ index }: { index: number }) => {
      this.model.decrementCounter(index);
    };

    const notifyModelAboutIncrementCounter = ({ index }: { index: number }) => {
      this.model.incrementCounter(index);
    };

    const getValue = () => {
      this.model.emitValue();
    };

    const notifyModelAboutClearCounters = () => {
      this.model.resetCounters();
    };

    this.view.subscribeCountersToEvents(
      'IncrementCounter',
      notifyModelAboutIncrementCounter,
    );
    this.view.subscribeCountersToEvents(
      'DecrementCounter',
      notifyModelAboutDecrementCounter,
    );

    this.view.subscribe('ApplyDropdownData', getValue);
    this.view.subscribe('ClearCounters', notifyModelAboutClearCounters);

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

    const notifyViewUpdatedValue = ({ value }: { value: string }): void => {
      this.view.updateInputValue(value);
    };

    this.model.subscribe('UpdateCounters', notifyViewUpdatedCounters);
    this.model.subscribe('UpdateValue', notifyViewUpdatedValue);

    return this;
  }
}

export { Presenter };
