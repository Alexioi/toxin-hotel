import { cssSelectors } from './constants';

class Filter {
  private root: Element;

  private button: Element | null = null;

  constructor(root: Element) {
    this.root = root;

    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.init();
  }

  private init() {
    this.initNodes().attachEventHandlers();

    return this;
  }

  private initNodes() {
    this.button = this.root.querySelector(cssSelectors.toggleButton);

    return this;
  }

  private attachEventHandlers() {
    this.button?.addEventListener('click', this.handleButtonClick);

    return this;
  }

  private handleButtonClick() {
    this.root.classList.toggle('filter_opened');

    return this;
  }
}

export { Filter };
