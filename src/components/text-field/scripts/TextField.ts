import EventEmitter from '@helpers/EventEmitter';

import Model from './mvp/Model';
import View from './mvp/View';
import Presenter from './mvp/Presenter';
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

    const eventEmitter: EventEmitter<{ TouchInput: null }> = new EventEmitter();
    const model = new Model(eventEmitter, type);
    const view = new View(node, eventEmitter);

    this.presenter = new Presenter(view, model, eventEmitter);
  }

  public getDates() {
    return this.presenter.getDates();
  }

  public setDates(dates: Dates) {
    this.presenter.setDates(dates);
  }
}

export { TextField, HTMLInputElementWithPlugin };
