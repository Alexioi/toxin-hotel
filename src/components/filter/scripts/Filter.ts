import { initNodes } from './methods';
import { Dom } from './types';

class Filter {
  private dom: Dom;

  constructor(node: Element) {
    this.handleButtonClick = this.handleButtonClick.bind(this);

    const { dom } = this.init(node);

    this.dom = dom;
  }

  private init(node: Element) {
    const root = node;
    const dom = initNodes(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers(dom: Dom) {
    const { button } = dom;

    button?.addEventListener('click', this.handleButtonClick);

    return this;
  }

  private handleButtonClick() {
    this.dom.root.classList.toggle('filter_opened');
  }
}

export { Filter };
