import cssSelectors from './constants';

import helpers from '../../helpers';
import Counter from './Counter';

const getPlural = (forms, count) => {
  const c10 = count % 10;
  const c100 = count % 100;
  const isUnit = c10 === 1 && c100 !== 11;
  const isPair = c10 >= 2 && c10 <= 4 && (c100 < 10 || c100 >= 20);

  let idx;

  if (isUnit) {
    idx = 0;
  } else if (isPair) {
    idx = 1;
  } else {
    idx = 2;
  }
  return forms[idx] || '';
};

const calculateValues = (variants, counters, emptyString) => {
  const value = [];

  variants.forEach((variant, index) => {
    const count = counters[index];

    if (count > 0) {
      value.push(`${count} ${getPlural(variant, count)}`);
    }
  });

  if (value.length === 0) {
    value.push(emptyString);
  }

  return value;
};

class DropdownMenu {
  constructor(node) {
    this.node = node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._getType();
    this._getCounters();
    this._attachEventHandlers();
    this._updateInput();
    this._toggleInputFocus();
    this._toggleClearButton();
    this._initCounters();
  }

  _findNodes() {
    this.input = this.node.querySelector(cssSelectors.input);
    this.inputButton = this.node.querySelector(cssSelectors.inputButton);
    this.textField = this.node.querySelector(cssSelectors.textField);
    this.items = this.node.querySelectorAll(cssSelectors.items);
    this.clearButton = this.node.querySelector(cssSelectors.clearButton);
    this.applyButton = this.node.querySelector(cssSelectors.applyButton);
    this.menu = this.node.querySelector(cssSelectors.menu);
  }

  _initCounters() {
    this.countersC = this.counters.map((counter, index) => {
      const { node, items } = this;

      return new Counter(node, items[index], counter, index);
    });
  }

  _getType() {
    this.variants = this.node.dataset.variants
      .split('-')
      .map((item) => item.split(','));
    this.groups = this.node.dataset.groups
      .split('-')
      .map((item) => item.split(','));
    this.placeholder = this.node.dataset.placeholder;
  }

  _getCounters() {
    this.counters = [...this.items].map((item) => {
      const counter = item.querySelector(cssSelectors.counter).innerHTML;

      return Number(counter);
    });
  }

  _attachEventHandlers() {
    this.textField.addEventListener('click', this._toggleMenu.bind(this));

    if (this.clearButton) {
      this.clearButton.addEventListener(
        'click',
        this._resetCounters.bind(this),
      );
    }

    if (this.applyButton) {
      this.applyButton.addEventListener(
        'click',
        this._onApplyButton.bind(this),
      );
    }

    //////////////////////////
    this.node.addEventListener(
      'counterUpdated',
      this._updateCounters.bind(this),
    );
    ////////////////////////////

    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _updateCounters(event) {
    const { index, counter } = event.detail;
    this.counters[index] = counter;

    this._toggleClearButton();

    if (!this.applyButton) {
      this._updateInput();
    }
  }

  _onClickDocument(event) {
    const elements = [this.menu, this.input, this.inputButton];
    if (!helpers.isElementsIncludeNode(event, elements)) {
      this._closeMenu();
    }
  }

  _closeMenu() {
    this.node.classList.remove('dropdown-menu_opened');

    this._toggleInputFocus();
  }

  _onApplyButton() {
    this._updateInput();
    this._toggleMenu();
  }

  _toggleMenu() {
    this.node.classList.toggle('dropdown-menu_opened');
    this._toggleInputFocus();
  }

  _toggleInputFocus() {
    const isOpened = this.node.classList.contains('dropdown-menu_opened');

    this.input.dataset.opened = isOpened ? 'true' : 'false';
  }

  _resetCounters() {
    this.countersC.forEach((counter) => {
      counter.resetCounter();
    });
  }

  _updateInput() {
    this.input.value = this._calculateValue();
  }

  _calculateValue() {
    let value = [];

    const counters = this.groups.map((group) => {
      let sum = 0;

      group.forEach((index) => {
        sum += this.counters[index];
      });

      return sum;
    });

    value = calculateValues(this.variants, counters, this.placeholder);

    return value.join(', ');
  }

  _toggleClearButton() {
    if (!this.clearButton) {
      return;
    }

    const countersSum = this.counters.reduce(
      (partialSum, counter) => partialSum + counter,
      0,
    );
    if (countersSum === 0) {
      this.clearButton.style.display = 'none';
    } else {
      this.clearButton.style.display = '';
    }
  }
}

export default DropdownMenu;
