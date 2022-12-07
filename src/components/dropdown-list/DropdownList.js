import cssSelectors from './constants';

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
    this.$title = this.$node.find(cssSelectors.title);
    this.$button = this.$node.find(cssSelectors.button);
  }

  _attachEventHandlers() {
    this.$title.on('click', this._toggleList.bind(this));
    this.$button.on('click', this._toggleList.bind(this));
  }

  _toggleList() {
    this.$node.toggleClass('dropdown-list_opened');
  }
}

export default DropdownList;
