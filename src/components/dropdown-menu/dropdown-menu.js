import EventEmitter from 'event-emitter';

class DropdownMenu {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._initItems();
    this._attachEventHandlers();
    this._updateInput();
    this._toggleInputFocus();
  }

  _findNodes() {
    this.$input = this.$node.find('.js-dropdown-menu__input input');
    this.$toggleButton = this.$node.find('.js-dropdown-menu__input button');
    this.$items = this.$node.find('.js-dropdown-menu__item');
    this.$clearButton = this.$node.find('.js-dropdown-menu__clear');
    this.$applyButton = this.$node.find('.js-dropdown-menu__apply');
  }

  _initItems() {
    this.dropdownItems = [];

    this.$items.each((i, node) => {
      this.dropdownItems[i] = new DropdownMenuItem($(node));
    });
  }

  _attachEventHandlers() {
    this.$toggleButton.on('click', this._toggleMenu.bind(this));
  }

  _toggleMenu() {
    this.$node.toggleClass('dropdown-menu_opened');

    this._toggleInputFocus();
  }

  _toggleInputFocus() {
    const isOpened = this.$node.hasClass('dropdown-menu_opened');

    this.$input[0].dataset.opened = isOpened ? 'true' : 'false';
  }

  _resetCounters() {
    this.dropdownItems.forEach((item) => {
      item.resetCounter();
    });
  }

  _updateInput() {
    const counterValues = [];

    this.dropdownItems.forEach((item) => {
      counterValues.push(item.getCounter());
    });

    const value = this._calculateValue(counterValues);

    this.$input.val(value);
  }
}

class DropdownMenuGuests extends DropdownMenu {
  _init() {
    super._init();

    this._checkDisplayOfClearButton();
  }

  _attachEventHandlers() {
    super._attachEventHandlers();

    this.$clearButton.on('click', this._resetCounters.bind(this));
    this.$applyButton.on('click', this._updateInput.bind(this));
    this.$applyButton.on('click', this._toggleMenu.bind(this));

    this.$items.each((i) => {
      this.dropdownItems[i].on('increasedCounterValue', this._showClearButton.bind(this));
    });

    this.$items.each((i) => {
      this.dropdownItems[i].on('counterValueIsZero', this._checkDisplayOfClearButton.bind(this));
    });
  }

  _checkDisplayOfClearButton() {
    let sumOfCounterValues = 0;

    this.$items.each((i) => {
      sumOfCounterValues += Number(this.dropdownItems[i].getCounter());
    });

    if (sumOfCounterValues === 0) {
      this._hideClearButton();
      return;
    }

    this._showClearButton();
  }

  _calculateValue(counterValues) {
    const dropdownItems = [
      ['гость', 'гости'],
      ['младенец', 'младенцы'],
    ];

    const integerCounterValues = [
      Number(counterValues[0]) + Number(counterValues[1]),
      Number(counterValues[2]),
    ];

    const value = [];

    integerCounterValues.forEach((integerCounterValue, i) => {
      if (integerCounterValue === 0) {
        return;
      }
      if (integerCounterValue === 1) {
        value.push(`${integerCounterValue} ${dropdownItems[i][0]}`);
        return;
      }
      value.push(`${integerCounterValue} ${dropdownItems[i][1]}`);
    });

    if (value.length === 0) {
      return 'Сколько гостей';
    }

    return value.join(', ');
  }

  _resetCounters() {
    super._resetCounters();

    this._hideClearButton();
  }

  _hideClearButton() {
    this.$clearButton.hide();
  }

  _showClearButton() {
    this.$clearButton.show();
  }
}

class DropdownMenuRooms extends DropdownMenu {
  _attachEventHandlers() {
    super._attachEventHandlers();

    this.$items.each((i) => {
      this.dropdownItems[i].on('updatedCounter', this._updateInput.bind(this));
    });
  }

  _calculateValue(counterValues) {
    const dropdownItems = [
      ['спальня', 'спален'],
      ['кровать', 'кроватей'],
      ['ванная комната', 'ванных комнат'],
    ];

    const integerCounterValues = [
      Number(counterValues[0]),
      Number(counterValues[1]),
      Number(counterValues[2]),
    ];

    const value = [];

    integerCounterValues.forEach((integerCounterValue, i) => {
      if (integerCounterValue === 0) {
        return;
      }
      if (integerCounterValues === 1) {
        value.push(`${integerCounterValue} ${dropdownItems[i][0]}`);
        return;
      }
      value.push(`${integerCounterValue} ${dropdownItems[i][1]}`);
    });

    if (value.length === 0) {
      return 'Сколько комнат';
    }

    return value.join(', ');
  }
}

class DropdownMenuItem {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  resetCounter() {
    this.$counter.text('0');
    this._disableButton();
    this.emit('updatedCounter');
  }

  getCounter() {
    return this.$counter.text();
  }

  _init() {
    this._findNodes();
    this._attachEventHandlers();
    this._disableButton();
  }

  _findNodes() {
    this.$counter = this.$node.find('.js-dropdown-menu__counter');
    this.$counterButtons = this.$node.find('.js-dropdown-menu__counter-button');
  }

  _attachEventHandlers() {
    this.$counterButtons[0].addEventListener('click', this._reduceCounter.bind(this));

    this.$counterButtons[1].addEventListener('click', this._addCounter.bind(this));
  }

  _addCounter() {
    const oldCounter = Number(this.$counter.text());
    const newCounter = String(oldCounter + 1);

    this.$counter.text(newCounter);
    this._enableButton();
    this.emit('updatedCounter');
    this.emit('increasedCounterValue');
  }

  _reduceCounter() {
    const oldCounter = Number(this.$counter.text());

    if (oldCounter === 0) {
      return;
    }

    const newCounter = String(oldCounter - 1);

    this.$counter.text(newCounter);
    this._disableButton();
    this.emit('updatedCounter');

    if (Number(newCounter) === 0) {
      this.emit('counterValueIsZero');
    }
  }

  _disableButton() {
    const counter = Number(this.$counter.text());

    if (counter === 0) {
      this.$counterButtons[0].classList.add('dropdown-menu__counter-button_disabled');
    }
  }

  _enableButton() {
    this.$counterButtons[0].classList.remove('dropdown-menu__counter-button_disabled');
  }
}

EventEmitter(DropdownMenuItem.prototype);

$(() => {
  $('.js-dropdown-menu.dropdown-menu_type-guests').each((i, node) => {
    new DropdownMenuGuests($(node));
  });
});

$(() => {
  $('.js-dropdown-menu.dropdown-menu_type-rooms').each((i, node) => {
    new DropdownMenuRooms($(node));
  });
});
