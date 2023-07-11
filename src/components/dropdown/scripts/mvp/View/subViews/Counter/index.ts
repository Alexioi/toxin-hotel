import { EventEmitter } from '@helpers/EventEmitter';

import { CounterEvents } from '../../../../types';
import { disableCounterButton, initNodes } from './methods';
import { Dom } from './type';

class Counter extends EventEmitter<CounterEvents> {
  private dom: Dom;

  private props: { index: number };

  constructor(node: Element, index: number) {
    super();

    this.handleDecrementButtonClick =
      this.handleDecrementButtonClick.bind(this);

    this.handleIncrementButtonClick =
      this.handleIncrementButtonClick.bind(this);

    const { dom, props } = this.init(node, index);

    this.dom = dom;
    this.props = props;
  }

  public update(counter: number) {
    const { decrementButton, counterNode } = this.dom;
    disableCounterButton(decrementButton, counter);

    if (counterNode !== null) {
      counterNode.innerHTML = String(counter);
    }

    return this;
  }

  private init(node: Element, index: number) {
    const dom = initNodes(node);

    this.attachEventHandlers(dom);

    return { dom, props: { index } };
  }

  private attachEventHandlers(dom: Dom) {
    const { decrementButton, incrementButton } = dom;

    decrementButton?.addEventListener('click', this.handleDecrementButtonClick);
    incrementButton?.addEventListener('click', this.handleIncrementButtonClick);

    return this;
  }

  private handleDecrementButtonClick() {
    this.emit('DecrementCounter', { index: this.props.index });
  }

  private handleIncrementButtonClick() {
    this.emit('IncrementCounter', { index: this.props.index });
  }
}

export { Counter };
