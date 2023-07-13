import { initNodes } from './methods';
import { Dom } from './type';

class DropdownList {
  private dom: Dom;

  private props: { isOpened: boolean };

  constructor(node: Element) {
    this.handleToggleList = this.handleToggleList.bind(this);

    const { dom, props } = this.init(node);

    this.dom = dom;
    this.props = props;
  }

  private init(node: Element) {
    const root = node;
    const dom = initNodes(root);

    this.attachEventHandlers(dom);
    const isOpened = dom.root.classList.contains('dropdown-list_opened');

    return { dom, props: { isOpened } };
  }

  private attachEventHandlers(dom: Dom) {
    const { title, button } = dom;
    title.addEventListener('click', this.handleToggleList);
    button.addEventListener('click', this.handleToggleList);

    return this;
  }

  private handleToggleList() {
    const { isOpened } = this.props;

    if (isOpened) {
      this.dom.root.classList.remove('dropdown-list_opened');

      this.props = { isOpened: false };
      return;
    }

    this.dom.root.classList.add('dropdown-list_opened');

    this.props = { isOpened: true };
  }
}

export { DropdownList };
