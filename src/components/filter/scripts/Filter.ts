import { initNodes } from './methods';
import { Dom } from './types';

class Filter {
  private dom: Dom;

  private props: { isOpened: boolean };

  constructor(node: Element) {
    this.handleButtonClick = this.handleButtonClick.bind(this);

    const { dom, props } = this.init(node);

    this.dom = dom;
    this.props = props;
  }

  private init(node: Element) {
    const root = node;
    const dom = initNodes(root);

    this.attachEventHandlers(dom);

    const isOpened = dom.root.classList.contains('filter_opened');

    return { dom, props: { isOpened } };
  }

  private attachEventHandlers(dom: Dom) {
    const { button } = dom;

    button.addEventListener('click', this.handleButtonClick);

    return this;
  }

  private handleButtonClick() {
    const { isOpened } = this.props;

    if (isOpened) {
      this.dom.root.classList.remove('filter_opened');

      this.props = { isOpened: false };
      return;
    }

    this.dom.root.classList.add('filter_opened');

    this.props = { isOpened: true };
  }
}

export { Filter };
