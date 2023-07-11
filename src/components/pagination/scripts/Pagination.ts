import { getCount, initNodes, initPlugin } from './methods';

class Pagination {
  constructor(node: Element) {
    this.init(node);
  }

  private init(node: Element) {
    const root = node;
    const dom = initNodes(root);
    const count = getCount(dom);

    initPlugin(dom, count);

    return this;
  }
}

export { Pagination };
