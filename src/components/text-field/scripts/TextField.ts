import { Model, View, Presenter } from './mvp';
import { Dates, MaskedType } from './types';

interface HTMLInputElementWithPlugin extends HTMLInputElement {
  plugin: TextField;
}

class TextField {
  private node: HTMLInputElementWithPlugin;

  private presenter: Presenter;

  constructor(node: HTMLInputElementWithPlugin, type: MaskedType) {
    this.node = node;

    this.node.plugin = this;

    const model = new Model(type);
    const view = new View(node);

    this.presenter = new Presenter(view, model);
  }

  public getDates() {
    return this.presenter.getDates();
  }

  public setDates(dates: Dates) {
    this.presenter.setDates(dates);
  }
}

export { TextField, HTMLInputElementWithPlugin };
