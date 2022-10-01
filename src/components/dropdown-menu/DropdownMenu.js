import cssSelectors from './constants';
import DropdownMenuItem from './DropdownMenuItem';

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
    this.$input = this.$node.find(cssSelectors.input);
    this.$toggleButton = this.$node.find(cssSelectors.toggleButton);
    this.$items = this.$node.find(cssSelectors.items);
    this.$clearButton = this.$node.find(cssSelectors.clearButton);
    this.$applyButton = this.$node.find(cssSelectors.applyButton);
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

export default DropdownMenu;
