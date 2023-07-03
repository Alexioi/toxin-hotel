import EventEmitter from '@helpers/EventEmitter';

import cssSelectors from '../../../constants';
import disableCounterButton from './methods';

class Counter {
  private root: Element;

  private eventEmitter: EventEmitter;

  private index: number;

  private decrementButton: Element | null = null;

  private incrementButton: Element | null = null;

  private counterNode: Element | null = null;

  constructor(node: Element, eventEmitter: EventEmitter, index: number) {
    this.root = node;
    this.eventEmitter = eventEmitter;
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
    this.eventEmitter.emit({
      eventName: 'DecrementCounter',
      eventArguments: this.index,
    });

    return this;
  }

  private handleIncrementButtonClick() {
    this.eventEmitter.emit({
      eventName: 'IncrementCounter',
      eventArguments: this.index,
    });

    return this;
  }
}

export default Counter;
