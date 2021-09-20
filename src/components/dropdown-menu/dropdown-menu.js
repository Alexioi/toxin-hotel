class DropdownMenu {
  constructor($node) {
    this.$node = $node;
    this.$toggleButton = this.$node.find('.dropdown-menu__input button');
    this.$items = this.$node.find('.dropdown-menu__item');
    this.$clearButton = this.$node.find('.dropdown-menu__clear');
    this.$input = this.$node.find('.dropdown-menu__input input');
    this.$applyButton = this.$node.find('.dropdown-menu__apply');

    this._initItems();
    this._attachEventHandlers();
    this._updateInput();
  }

  _initItems() {
    this.dropdownItems = [];

    this.$items.each((i, node) => {
      this.dropdownItems[i] = new dropdownMenuCounter($(node));
    });
  }

  _attachEventHandlers() {
    this.$toggleButton.on('click', () => {
      this._toggleMenu();
    });

    this.$clearButton.on('click', () => {
      this._resetCounters();
    });
    this.$applyButton.on('click', () => {
      this._updateInput();
    });
  }

  _toggleMenu() {
    this.$node.toggleClass('dropdown-menu_opened');
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
    this._toggleMenu();
  }

  _calculateValue() {}
}

class DropdownMenuGuests extends DropdownMenu {
  _calculateValue(counterValues) {
    const dropdownItems = [
      ['гость', 'гости'],
      ['младенец', 'младенцы'],
    ];

    counterValues = [Number(counterValues[0]) + Number(counterValues[1]), Number(counterValues[2])];

    let value = [];

    counterValues.forEach((counterValue, i) => {
      if (counterValue === 0) {
        return;
      }
      if (counterValue === 1) {
        value.push(`${counterValue} ${dropdownItems[i][0]}`);
        return;
      }
      value.push(`${counterValue} ${dropdownItems[i][1]}`);
    });

    if (value.length === 0) {
      return 'Сколько гостей';
    }

    return value.join(', ');
  }
}

class DropdownMenuRooms extends DropdownMenu {
  _calculateValue(counterValues) {
    const dropdownItems = [
      ['спальня', 'спален'],
      ['кровать', 'кроватей'],
      ['ванная комната', 'ванных комнат'],
    ];

    counterValues = [Number(counterValues[0]), Number(counterValues[1]), Number(counterValues[2])];

    let value = [];

    counterValues.forEach((counterValue, i) => {
      if (counterValue === 0) {
        return;
      }
      if (counterValue === 1) {
        value.push(`${counterValue} ${dropdownItems[i][0]}`);
        return;
      }
      value.push(`${counterValue} ${dropdownItems[i][1]}`);
    });

    if (value.length === 0) {
      return 'Сколько комнат';
    }

    return value.join(', ');
  }
}

class dropdownMenuCounter {
  constructor($node) {
    this.$node = $node;
    this.$counter = this.$node.find('.js-dropdown__counter');
    this.$counterButtons = this.$node.find('.js-dropdown__counter-button');

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$counterButtons[0].addEventListener('click', () => {
      this._reduceCounter();
    });

    this.$counterButtons[1].addEventListener('click', () => {
      this._addCounter();
    });
  }

  _addCounter() {
    const oldCounter = Number(this.$counter.text());
    const newCounter = String(oldCounter + 1);

    this.$counter.text(newCounter);
  }

  _reduceCounter() {
    const oldCounter = Number(this.$counter.text());

    if (oldCounter === 0) {
      return;
    }

    const newCounter = String(oldCounter - 1);

    this.$counter.text(newCounter);
  }

  resetCounter() {
    this.$counter.text('0');
  }

  getCounter() {
    return this.$counter.text();
  }
}

(() => {
  $('.js-dropdown-menu.dropdown-menu_type-guests').each((i, node) => {
    new DropdownMenuGuests($(node));
  });
})();

(() => {
  $('.js-dropdown-menu.dropdown-menu_type-rooms').each((i, node) => {
    new DropdownMenuRooms($(node));
  });
})();
