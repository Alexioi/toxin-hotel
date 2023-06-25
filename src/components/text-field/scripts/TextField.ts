import EventEmitter from '@helpers/EventEmitter';

import Model from './mvp/Model/Model';
import View from './mvp/View/View';
import Presenter from './mvp/Presenter/Presenter';
import { Dates, MaskedType } from './types';

interface HTMLInputElementWithPlugin extends HTMLInputElement {
  plugin: TextField;
}

class TextField {
  private node: HTMLInputElementWithPlugin;

  private eventEmitter: EventEmitter;

  private model: Model;

  private view: View;

  private presenter: Presenter;

  constructor(node: HTMLInputElement) {
    this.node = node as HTMLInputElement & { plugin: TextField };

    this.node.plugin = this;

    this.eventEmitter = new EventEmitter();

    const type = <MaskedType>node.dataset.maskedType;

    this.model = new Model(this.eventEmitter, type);
    this.view = new View(node, this.eventEmitter);
    this.presenter = new Presenter(this.view, this.model, this.eventEmitter);
  }

  public getDates() {
    return this.presenter.getDates();
  }

  public setDates(dates: Dates) {
    this.presenter.setDates(dates);
  }
}

export default TextField;
