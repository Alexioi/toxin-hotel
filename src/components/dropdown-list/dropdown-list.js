class DropdownList {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._attachEventHandlers();
  }

  _findNodes() {
    this.$button = this.$node.find('.js-dropdown-list__button');
  }

  _attachEventHandlers() {
    this.$button.on('click', () => {
      this._toggleList();
    });
  }

  _toggleList() {
    this.$node.toggleClass('dropdown-list_opened');
  }
}

$(() => {
  $('.js-dropdown-list').each((i, node) => {
    new DropdownList($(node));
  });
});
