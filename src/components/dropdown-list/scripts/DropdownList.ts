import cssSelectors from './constants';

class DropdownList {
  private root: Element;

  private title: Element | null = null;

  private button: Element | null = null;

  constructor(node: Element) {
    this.root = node;

    this.toggleList = this.toggleList.bind(this);

    this.init();
  }

  private init() {
    this.initNodes().attachEventHandlers();

    return this;
  }

  private initNodes() {
    this.title = this.root.querySelector(cssSelectors.title);
    this.button = this.root.querySelector(cssSelectors.button);

    return this;
  }

  private attachEventHandlers() {
    this.title?.addEventListener('click', this.toggleList);
    this.button?.addEventListener('click', this.toggleList);

    return this;
  }

  private toggleList() {
    this.root.classList.toggle('dropdown-list_opened');

    return this;
  }
}

export default DropdownList;
