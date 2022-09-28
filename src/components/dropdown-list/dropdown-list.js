const cssSelectors = {
  dropdownlist: '.js-dropdown-list',
  button: '.js-dropdown-list__button',
};

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
    this.$button = this.$node.find(cssSelectors.button);
  }

  _attachEventHandlers() {
    this.$button.on('click', this._toggleList.bind(this));
  }

  _toggleList() {
    this.$node.toggleClass('dropdown-list_opened');
  }
}

$(() => {
  $(cssSelectors.dropdownlist).each((i, node) => {
    new DropdownList($(node));
  });
});
