import { Paginationjs } from '@libs/paginationjs';

import { cssSelectors } from './constants';

class Pagination {
  private root: Element;

  private plugin: Element | null = null;

  private rangeNode: Element | null = null;

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
    this.rangeNode = this.root.querySelector(cssSelectors.range);

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
      return this;
    }

    if (this.rangeNode === null) {
      return this;
    }

    new Paginationjs(this.plugin, this.rangeNode, this.count);

    return this;
  }
}

export { Pagination };
