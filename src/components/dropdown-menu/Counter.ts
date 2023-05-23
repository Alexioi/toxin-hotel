import cssSelectors from './constants';
import helpers from '../../helpers';

const disableCounterButton = (node, counter) => {
  if (counter === 0) {
    node.classList.add('dropdown-menu__counter-button_disabled');
    node.setAttribute('disabled', 'disabled');
  } else {
    node.classList.remove('dropdown-menu__counter-button_disabled');
    node.removeAttribute('disabled');
  }
};

class Counter {
  constructor(root, node, counter, index) {
    this.root = root;
    this.node = node;
    this.counter = counter;
    this.index = index;

    this._init();
  }

  resetCounter() {
    this.counter = 0;

    const { root, node, counter, index } = this;

    helpers.dispatchEvent('counterUpdated', { counter, index }, [root, node]);
  }

  _init() {
    this._findNodes();
    this._attachEventHandlers();
  }

  _findNodes() {
    const counterButtons = this.node.querySelectorAll(
      cssSelectors.counterButtons,
    );
    const [decrementCounterButton, incrementCounterButton] = counterButtons;

    if (typeof decrementCounterButton !== 'undefined') {
      this.decrementCounterButton = decrementCounterButton;
    }

    if (typeof incrementCounterButton !== 'undefined') {
      this.incrementCounterButton = incrementCounterButton;
    }

    this.counterNode = this.node.querySelector(cssSelectors.counter);
  }

  _attachEventHandlers() {
    this.decrementCounterButton.addEventListener(
      'click',
      this._handleCounterClick.bind(this, -1),
    );
    this.incrementCounterButton.addEventListener(
      'click',
      this._handleCounterClick.bind(this, 1),
    );
    this.node.addEventListener(
      'counterUpdated',
      this._handleCounterUpdated.bind(this),
    );
  }

  _handleCounterClick(number) {
    this._updateCounter(number);

    const { root, node, counter, index } = this;

    helpers.dispatchEvent('counterUpdated', { counter, index }, [root, node]);
  }

  _handleCounterUpdated(event) {
    const { counter } = event.detail;

    this.counterNode.innerHTML = counter;

    disableCounterButton(this.decrementCounterButton, counter);
  }

  _updateCounter(number) {
    this.counter += number;
  }
}

export default Counter;
