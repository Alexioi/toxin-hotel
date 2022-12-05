import Paginationjs from '@libs/paginationjs';
import cssSelectors from './constants';

class Pagination {
  constructor($component) {
    this.$component = $component;

    this._init();
  }

  _init() {
    this._findElements();
    this._getCount();
    this._initPlugin();
  }

  _findElements() {
    this.$plugin = this.$component.find(cssSelectors.plugin);
    this.$startItem = this.$component.find(cssSelectors.startItem);
    this.$endItem = this.$component.find(cssSelectors.endItem);
  }

  _getCount() {
    this.count = this.$component.data().count;
  }

  _initPlugin() {
    new Paginationjs(this.$plugin, this.$startItem, this.$endItem, this.count);
  }
}

export default Pagination;
