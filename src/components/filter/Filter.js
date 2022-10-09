import cssSelectors from './constants';

class Filter {
  constructor($component) {
    this.$component = $component;

    this._init();
  }

  _init() {
    this._findElements();
    this._attachEventHandlers();
  }

  _findElements() {
    this.$button = this.$component.find(cssSelectors.toggleButton);
  }

  _attachEventHandlers() {
    this.$button.on('click', this._toggleItems.bind(this));
  }

  _toggleItems() {
    this.$component.toggleClass('filter_opened');
  }
}

export default Filter;
