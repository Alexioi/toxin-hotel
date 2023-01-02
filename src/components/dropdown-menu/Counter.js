import cssSelectors from './constants';

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

    this._toggleDecrementCounterButton();

    this.counterNode.innerHTML = this.counter;

    this._notifyOfUpdateCounterEvent();
  }

  _init() {
    this._findNodes();
    this._attachEventHandlers();

    this._updateCounter(0);
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
      this._updateCounter.bind(this, -1),
    );
    this.incrementCounterButton.addEventListener(
      'click',
      this._updateCounter.bind(this, 1),
    );
  }

  _updateCounter(number) {
    this.counter += number;

    this._toggleDecrementCounterButton();

    this.counterNode.innerHTML = this.counter;

    this._notifyOfUpdateCounterEvent();
  }

  _notifyOfUpdateCounterEvent() {
    const { counter, index } = this;

    const eventObject = {
      detail: {
        counter,
        index,
      },
    };

    const customEvent = new CustomEvent('counterUpdated', eventObject);

    this.root.dispatchEvent(customEvent);
  }

  _toggleDecrementCounterButton() {
    if (this.counter === 0) {
      this.decrementCounterButton.classList.add(
        'dropdown-menu__counter-button_disabled',
      );
      this.decrementCounterButton.setAttribute('disabled', 'disabled');
    } else {
      this.decrementCounterButton.classList.remove(
        'dropdown-menu__counter-button_disabled',
      );
      this.decrementCounterButton.removeAttribute('disabled');
    }
  }
}

export default Counter;
