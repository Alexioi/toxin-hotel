import { EventEmitter } from '@helpers/EventEmitter';

import { cssSelectors } from '../../../../constants';
import { CounterEvents } from '../../../../types';
import { disableCounterButton } from './methods';

class Counter extends EventEmitter<CounterEvents> {
  private root: Element;

  private index: number;

  private decrementButton: Element | null = null;

  private incrementButton: Element | null = null;

  private counterNode: Element | null = null;

  constructor(node: Element, index: number) {
    super();

    this.root = node;

    this.index = index;

    this.handleDecrementButtonClick =
      this.handleDecrementButtonClick.bind(this);

    this.handleIncrementButtonClick =
      this.handleIncrementButtonClick.bind(this);

    this.init();
  }

  public update(counter: number) {
    disableCounterButton(this.decrementButton, counter);

    if (this.counterNode !== null) {
      this.counterNode.innerHTML = String(counter);
    }

    return this;
  }

  private init() {
    this.initNodes().attachEventHandlers();

    return this;
  }

  private initNodes() {
    const [decrementButton, incrementButton] = this.root.querySelectorAll(
      cssSelectors.counterButtons,
    );

    this.decrementButton =
      typeof decrementButton === 'undefined' ? null : decrementButton;

    this.incrementButton =
      typeof incrementButton === 'undefined' ? null : incrementButton;

    this.counterNode = this.root.querySelector(cssSelectors.counter);

    return this;
  }

  private attachEventHandlers() {
    this.decrementButton?.addEventListener(
      'click',
      this.handleDecrementButtonClick,
    );
    this.incrementButton?.addEventListener(
      'click',
      this.handleIncrementButtonClick,
    );

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
