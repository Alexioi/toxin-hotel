import cssSelectors from './constants';

class Filter {
  private root: Element;

  private button: Element | null = null;

  constructor(root: Element) {
    this.root = root;

    this.toggleItems = this.toggleItems.bind(this);

    this.init();
  }

  private init() {
    this.findAndInitElements();
    this.attachEventHandlers();
  }

  private findAndInitElements() {
    this.button = this.root.querySelector(cssSelectors.toggleButton);
  }

  private attachEventHandlers() {
    this.button?.addEventListener('click', this.toggleItems);
  }

  private toggleItems() {
    this.root.classList.toggle('filter_opened');
  }
}

export default Filter;
