import EventEmitter from '@helpers/EventEmitter';

import cssSelectors from '../../../constants';

const disableCounterButton = (node: Element | null, counter: number) => {
  if (counter === 0) {
    node?.classList.add('dropdown__counter-button_disabled');
    node?.setAttribute('disabled', 'disabled');
  } else {
    node?.classList.remove('dropdown__counter-button_disabled');
    node?.removeAttribute('disabled');
  }
};

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

    // eslint-disable-next-line operator-linebreak
    this.handleDecrementButtonClick =
      this.handleDecrementButtonClick.bind(this);

    // eslint-disable-next-line operator-linebreak
    this.handleIncrementButtonClick =
      this.handleIncrementButtonClick.bind(this);

    this.init();
  }

  public update(counter: number) {
    disableCounterButton(this.decrementButton, counter);

    if (this.counterNode !== null) {
      this.counterNode.innerHTML = String(counter);
    }
  }

  private init() {
    this.findAndInitNodes().attachEventHandlers();

    const counter = this.counterNode?.innerHTML;

    if (counter === '0') {
      disableCounterButton(this.decrementButton, Number(counter));
    }
  }

  private findAndInitNodes() {
    const [decrementButton, incrementButton] = this.root.querySelectorAll(
      cssSelectors.counterButtons,
    );

    // eslint-disable-next-line operator-linebreak
    this.decrementButton =
      typeof decrementButton === 'undefined' ? null : decrementButton;

    // eslint-disable-next-line operator-linebreak
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
  }

  private handleIncrementButtonClick() {
    this.eventEmitter.emit({
      eventName: 'IncrementCounter',
      eventArguments: this.index,
    });
  }
}

export default Counter;
