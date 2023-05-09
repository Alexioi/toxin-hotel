import EventEmitter from '../../helpers/EventEmitter';

import { maskedType } from './types';

import Model from './mvp/Model/Model';
import View from './mvp/View/View';
import Presenter from './mvp/Presenter/Presenter';

interface HTMLInputElementWithPlugin extends HTMLInputElement {
  plugin?: TextField;
}

class TextField {
  private node: HTMLInputElementWithPlugin;

  private eventEmitter: EventEmitter;

  private model: Model;

  private view: View;

  private presenter: Presenter;

  constructor(node: HTMLInputElement) {
    this.node = node;

    this.node.plugin = this;

    this.eventEmitter = new EventEmitter();

    const type = <maskedType>node.dataset.maskedType;

    this.model = new Model(this.eventEmitter, type);
    this.view = new View(node, this.eventEmitter, type);
    this.presenter = new Presenter(this.view, this.model, this.eventEmitter);
  }

  public getData() {
    return '10.10.2010';
  }

  public setData(data: string) {
    this.presenter.setData(data);
  }
}

export default TextField;
