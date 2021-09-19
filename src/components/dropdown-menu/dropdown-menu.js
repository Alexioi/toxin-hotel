class DropdownMenu {
  constructor($node) {
    this.$node = $node;
    this.$toggleButton = this.$node.find('.dropdown-menu__input button');
    this.$items = this.$node.find('.dropdown-menu__item');
    this.$clearButton = this.$node.find('.dropdown-menu__clear');

    this._initItems();
    this._attachEventHandlers();
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
  }

  _toggleMenu() {
    this.$node.toggleClass('dropdown-menu_opened');
  }

  _resetCounters() {
    this.dropdownItems.forEach((item) => {
      item.resetCounter();
    });
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
}

(() => {
  $('.js-dropdown-menu').each((i, node) => {
    new DropdownMenu($(node));
  });
})();
