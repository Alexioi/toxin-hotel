import cssSelectors from './constants';

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
    this._toggleCounterButtons();
    this._toggleClearButton();
  }

  _findNodes() {
    this.input = this.node.querySelector(cssSelectors.input);
    this.items = this.node.querySelectorAll(cssSelectors.items);
    this.clearButton = this.node.querySelector(cssSelectors.clearButton);
    this.applyButton = this.node.querySelector(cssSelectors.applyButton);
    this.menu = this.node.querySelector(cssSelectors.menu);
  }

  _getType() {
    this.type = this.node.dataset.type;
  }

  _getCounters() {
    this.counters = [...this.items].map((item) => {
      const counter = item.querySelector('.js-dropdown-menu__counter').innerHTML;

      return Number(counter);
    });
  }

  _attachEventHandlers() {
    this.input.addEventListener('click', this._toggleMenu.bind(this));
    if (this.clearButton) {
      this.clearButton.addEventListener('click', this._resetCounters.bind(this));
    }

    if (this.applyButton) {
      this.applyButton.addEventListener('click', this._onApplyButton.bind(this));
    }

    this.items.forEach((item, index) => {
      const counterButtons = item.querySelectorAll(cssSelectors.counterButtons);
      const counter = item.querySelector(cssSelectors.counter);

      counterButtons[0].addEventListener(
        'click',
        this._decreaseCounterValue.bind(this, index, counter),
      );
      counterButtons[1].addEventListener(
        'click',
        this._increaseCounterValue.bind(this, index, counter),
      );
    });
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onClickDocument(event) {
    const isCurrentMenuTarget = event.target.closest(cssSelectors.menu) === this.menu;
    const isCurrentInput = event.target !== this.input;

    if (!isCurrentMenuTarget && isCurrentInput) {
      this._closeMenu();
    }
  }

  _closeMenu() {
    this.node.classList.remove('dropdown-menu_opened');

    this._toggleInputFocus();
  }

  _increaseCounterValue(index, counterNode) {
    this.counters[index] += 1;

    const counter = counterNode;

    counter.innerHTML = this.counters[index];

    if (!this.applyButton) {
      this._updateInput();
    }

    this._toggleCounterButtons();
    this._toggleClearButton();
  }

  _decreaseCounterValue(index, counterNode) {
    const currentCounter = this.counters[index];
    const counter = counterNode;

    if (currentCounter !== 0) {
      this.counters[index] -= 1;

      counter.innerHTML = this.counters[index];
    }

    if (!this.applyButton) {
      this._updateInput();
    }

    this._toggleCounterButtons();
    this._toggleClearButton();
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
    [...this.items].forEach((item) => {
      const counter = item;
      counter.querySelector('.js-dropdown-menu__counter').innerHTML = 0;
    });

    this.counters = [0, 0, 0];

    this._toggleCounterButtons();
    this._toggleClearButton();
  }

  _updateInput() {
    this.input.value = this._calculateValue();
  }

  _calculateValue() {
    let value = [];

    if (this.type === 'rooms') {
      const items = [
        { variants: ['спальня', 'спальни', 'спален'], count: this.counters[0] },
        { variants: ['кровать', 'кровати', 'кроватей'], count: this.counters[1] },
        {
          variants: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
          count: this.counters[2],
        },
      ];

      value = this._calculateValueArray(items, 'Сколько комнат');
    }

    if (this.type === 'guests') {
      const items = [
        {
          variants: ['гость', 'гостя', 'гостей'],
          count: Number(this.counters[0]) + Number(this.counters[1]),
        },
        {
          variants: ['младенец', 'младенца', 'младенцев'],
          count: this.counters[2],
        },
      ];

      value = this._calculateValueArray(items, 'Сколько гостей');
    }

    return value.join(', ');
  }

  _calculateValueArray(items, emptyString) {
    const value = [];

    items.forEach(({ variants, count }) => {
      if (count > 0) {
        value.push(`${count} ${this.constructor._getPlural(variants, count)}`);
      }
    });

    if (value.length === 0) {
      value.push(emptyString);
    }

    return value;
  }

  static _getPlural(forms, count) {
    const isUnit = count % 10 === 1 && count % 100 !== 11;
    const isPair = count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20);
    let idx;

    if (isUnit) {
      idx = 0;
    } else if (isPair) {
      idx = 1;
    } else {
      idx = 2;
    }
    return forms[idx] || '';
  }

  _toggleCounterButtons() {
    this.counters.forEach((counter, index) => {
      const counterButton = this.items[index].querySelector('.js-dropdown-menu__counter-button');

      if (counter === 0) {
        counterButton.classList.add('dropdown-menu__counter-button_disabled');
      } else {
        counterButton.classList.remove('dropdown-menu__counter-button_disabled');
      }
    });
  }

  _toggleClearButton() {
    if (!this.clearButton) {
      return;
    }

    const countersSum = this.counters.reduce((partialSum, counter) => partialSum + counter, 0);
    if (countersSum === 0) {
      this.clearButton.style.display = 'none';
    } else {
      this.clearButton.style.display = '';
    }
  }
}

export default DropdownMenu;
