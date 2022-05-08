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
    this.$items = this.$component.find('.js-filter__items');
    this.$button = this.$component.find('.js-filter__toggle-button ');
  }

  _attachEventHandlers() {
    this.$button.on('click', () => {
      this._toggleItems();
    });
  }

  _toggleItems() {
    this.$items.toggleClass('filter__items-opened');
  }
}

$(() => {
  $('.js-filter').each((i, node) => {
    new Filter($(node));
  });
});
