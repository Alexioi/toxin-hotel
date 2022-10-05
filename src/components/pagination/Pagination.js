import 'paginationjs';
import cssSelectors from './constants';
import Paginationjs from '../../libs/paginationjs';

class Pagination {
  constructor($component) {
    this.$component = $component;

    this._init();
  }

  _init() {
    this._findElements();
    this._initPlugin();
  }

  _findElements() {
    this.$plugin = this.$component.find(cssSelectors.plugin);
    this.$startItem = this.$component.find(cssSelectors.startItem);
    this.$endItem = this.$component.find(cssSelectors.endItem);
  }

  _initPlugin() {
    this.paginationjs = new Paginationjs(this.$plugin, this.$startItem, this.$endItem);
  }
}

export default Pagination;
