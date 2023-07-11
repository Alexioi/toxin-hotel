import { EventEmitter } from '@helpers/EventEmitter';

import { CounterEvents } from '../../../../types';
import { disableCounterButton, initNodes } from './methods';

class Counter extends EventEmitter<CounterEvents> {
  private dom: {
    root: Element;
    decrementButton: Element | null;
    incrementButton: Element | null;
    counterNode: Element | null;
  };

  private index: number;

  constructor(node: Element, index: number) {
    super();

    this.index = index;

    this.handleDecrementButtonClick =
      this.handleDecrementButtonClick.bind(this);

    this.handleIncrementButtonClick =
      this.handleIncrementButtonClick.bind(this);

    this.dom = initNodes(node);

    this.init();
  }

  public update(counter: number) {
    const { decrementButton, counterNode } = this.dom;
    disableCounterButton(decrementButton, counter);

    if (counterNode !== null) {
      counterNode.innerHTML = String(counter);
    }

    return this;
  }

  private init() {
    this.attachEventHandlers();

    return this;
  }

  private attachEventHandlers() {
    const { decrementButton, incrementButton } = this.dom;

    decrementButton?.addEventListener('click', this.handleDecrementButtonClick);
    incrementButton?.addEventListener('click', this.handleIncrementButtonClick);

    return this;
  }

  private handleDecrementButtonClick() {
    this.emit('DecrementCounter', { index: this.index });
  }

  private handleIncrementButtonClick() {
    this.emit('IncrementCounter', { index: this.index });
  }
}

export { Counter };
