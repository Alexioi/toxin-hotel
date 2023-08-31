import { Data, Dates } from '../../types';
import { Model } from '../Model';
import { View } from '../View';

class Presenter {
  private view: View;

  private model: Model;

  constructor(view: View, model: Model) {
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

    this.view.subscribe('inputData', notifyModel);

    this.view.subscribe('touchInput', getData);

    this.view.subscribe('deleteData', notifyModelDelete);

    this.view.subscribe('blurInput', fixData);

    return this;
  }

  private attachEventEmittersToView() {
    const notifyViewUpdatedModelOptions = ({ dates }: Data): void => {
      this.view.displayDate(dates);
    };

    this.model.subscribe('updateDates', notifyViewUpdatedModelOptions);

    return this;
  }
}

export { Presenter };
