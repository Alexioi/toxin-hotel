// @ts-ignore
import Paginationjs from '@libs/paginationjs';

import cssSelectors from './constants';

class Pagination {
  private root: Element;

  private plugin: JQuery | null = null;

  private startItem: JQuery | null = null;

  private endItem: JQuery | null = null;

  private count: number = 0;

  constructor(root: Element) {
    this.root = root;

    this.init();
  }

  private init() {
    this.findElements();
    this.getCount();
    this.initPlugin();
  }

  private findElements() {
    this.plugin = $(this.root).find(cssSelectors.plugin);
    this.startItem = $(this.root).find(cssSelectors.startItem);
    this.endItem = $(this.root).find(cssSelectors.endItem);
  }

  private getCount() {
    if (this.root instanceof HTMLElement) {
      const { count } = this.root.dataset;
      if (typeof count !== 'undefined') {
        this.count = Number(count);
      }
    }
  }

  private initPlugin() {
    new Paginationjs(this.plugin, this.startItem, this.endItem, this.count);
  }
}

export default Pagination;
