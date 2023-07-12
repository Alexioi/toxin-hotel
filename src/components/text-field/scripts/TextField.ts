import { Model, View, Presenter } from './mvp';
import { Dates, MaskedType } from './types';

interface HTMLInputElementWithPlugin extends HTMLInputElement {
  plugin: TextField;
}

class TextField {
  private dom: { root: HTMLInputElementWithPlugin };

  private presenter: Presenter;

  constructor(node: HTMLInputElementWithPlugin, type: MaskedType) {
    this.dom = { root: node };

    this.dom.root.plugin = this;

    const model = new Model(type);
    const view = new View(this.dom.root);

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
