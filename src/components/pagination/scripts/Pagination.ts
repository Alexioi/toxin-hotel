import { JQueryWithPaginationjs, Paginationjs } from '@libs/paginationjs';

import cssSelectors from './constants';

class Pagination {
  private root: Element;

  private plugin: Element | null = null;

  private startItem: Element | null = null;

  private endItem: Element | null = null;

  private count: number = 0;

  constructor(root: Element) {
    this.root = root;

    this.init();
  }

  private init() {
    this.initNodes().getCount().initPlugin();

    return this;
  }

  private initNodes() {
    this.plugin = this.root.querySelector(cssSelectors.plugin);
    this.startItem = this.root.querySelector(cssSelectors.startItem);
    this.endItem = this.root.querySelector(cssSelectors.endItem);

    return this;
  }

  private getCount() {
    if (this.root instanceof HTMLElement) {
      this.count = Number(this.root.dataset.count);
    }

    return this;
  }

  private initPlugin() {
    if (this.plugin === null) {
      return;
    }

    if (this.startItem === null) {
      return;
    }

    if (this.endItem === null) {
      return;
    }

    const $plugin = $(this.plugin) as JQueryWithPaginationjs;

    new Paginationjs($plugin, this.startItem, this.endItem, this.count);

    return this;
  }
}

export default Pagination;
