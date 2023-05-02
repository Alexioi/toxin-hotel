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

  private eventEmitter!: EventEmitter;

  private model!: Model;

  private view!: View;

  constructor(node: HTMLInputElement) {
    this.node = node;

    const manageable = <string>node.dataset.manageable;

    if (manageable === 'true') {
      this.node.plugin = this;

      this.eventEmitter = new EventEmitter();

      const type = <maskedType>node.dataset.maskedType;

      this.model = new Model(this.eventEmitter, type);
      this.view = new View(node, this.eventEmitter);
      new Presenter(this.view, this.model, this.eventEmitter);
    }
  }
}

export default TextField;
