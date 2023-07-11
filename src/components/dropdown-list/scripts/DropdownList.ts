import { initNodes } from './methods';
import { Dom } from './type';

class DropdownList {
  private dom: Dom;

  constructor(node: Element) {
    this.toggleList = this.toggleList.bind(this);

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
    const { title, button } = dom;
    title?.addEventListener('click', this.toggleList);
    button?.addEventListener('click', this.toggleList);

    return this;
  }

  private toggleList() {
    this.dom.root.classList.toggle('dropdown-list_opened');

    return this;
  }
}

export { DropdownList };
