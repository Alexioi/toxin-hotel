import cssSelectors from './constants';
import helpers from '../../helpers';

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
  private dropdownMenu: HTMLElement;

  private node: HTMLElement;

  private decrementCounterButton: Element | null = null;

  private incrementCounterButton: Element | null = null;

  private counterNode: Element | null = null;

  private counter: number;

  private index: number;

  constructor(
    dropdownMenu: HTMLElement,
    node: HTMLElement,
    counter: number,
    index: number,
  ) {
    this.dropdownMenu = dropdownMenu;
    this.node = node;
    this.counter = counter;
    this.index = index;

    this._init();
  }

  resetCounter() {
    this.counter = 0;

    const { dropdownMenu, node, counter, index } = this;

    helpers.dispatchEvent('counterUpdated', { counter, index }, [
      dropdownMenu,
      node,
    ]);
  }

  _init() {
    this._findNodes();
    this._attachEventHandlers();
  }

  _findNodes() {
    const [decrementCounterButton, incrementCounterButton] =
      this.node.querySelectorAll(cssSelectors.counterButtons);

    this.decrementCounterButton =
      typeof decrementCounterButton === 'undefined'
        ? null
        : decrementCounterButton;

    this.incrementCounterButton =
      typeof incrementCounterButton === 'undefined'
        ? null
        : incrementCounterButton;

    this.counterNode = this.node.querySelector(cssSelectors.counter);
  }

  _attachEventHandlers() {
    this.decrementCounterButton?.addEventListener(
      'click',
      this._handleCounterClick.bind(this, -1),
    );
    this.incrementCounterButton?.addEventListener(
      'click',
      this._handleCounterClick.bind(this, 1),
    );
    this.node.addEventListener(
      'counterUpdated',
      this._handleCounterUpdated.bind(this),
    );
  }

  _handleCounterClick(number: number) {
    this._updateCounter(number);

    const { dropdownMenu, node, counter, index } = this;

    helpers.dispatchEvent('counterUpdated', { counter, index }, [
      dropdownMenu,
      node,
    ]);
  }

  _handleCounterUpdated(event: Event) {
    // @ts-ignore
    const { counter } = event.detail;

    if (this.counterNode !== null) {
      this.counterNode.innerHTML = counter;
    }

    disableCounterButton(this.decrementCounterButton, counter);
  }

  _updateCounter(number: number) {
    this.counter += number;
  }
}

export default Counter;
