import { cssSelectors } from './constants';
import {
  calculateBackIndex,
  calculateNextIndex,
  calculateTargetIndex,
  hideImages,
} from './methods';

class Carousel {
  private root: Element;

  private images: NodeListOf<Element> | never[] = [];

  private back: Element | null = null;

  private next: Element | null = null;

  private buttons: NodeListOf<Element> | never[] = [];

  private currentImageIndex = 0;

  private quantityImageIndex = 0;

  constructor(root: Element) {
    this.root = root;

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleTargetButtonClick = this.handleTargetButtonClick.bind(this);

    this.init();
  }

  private init() {
    if (this.root instanceof HTMLElement) {
      this.currentImageIndex = Number(this.root.dataset.currentImage);
      this.quantityImageIndex = Number(this.root.dataset.quantityImage);
    }

    this.initNodes().attachEventHandlers();

    hideImages(this.images, this.buttons, this.currentImageIndex);

    return this;
  }

  private initNodes() {
    this.images = this.root.querySelectorAll(cssSelectors.images);
    this.back = this.root.querySelector(cssSelectors.back);
    this.next = this.root.querySelector(cssSelectors.next);
    this.buttons = this.root.querySelectorAll(cssSelectors.buttons);

    return this;
  }

  private attachEventHandlers() {
    this.back?.addEventListener('click', this.handleBackButtonClick);
    this.next?.addEventListener('click', this.handleNextButtonClick);
    this.buttons.forEach((node) => {
      node.addEventListener('click', this.handleTargetButtonClick);
    });

    return this;
  }

  private handleBackButtonClick() {
    this.currentImageIndex = calculateBackIndex(
      this.currentImageIndex,
      this.quantityImageIndex,
    );
    hideImages(this.images, this.buttons, this.currentImageIndex);

    return this;
  }

  private handleNextButtonClick() {
    this.currentImageIndex = calculateNextIndex(
      this.currentImageIndex,
      this.quantityImageIndex,
    );
    hideImages(this.images, this.buttons, this.currentImageIndex);

    return this;
  }

  private handleTargetButtonClick(event: Event) {
    this.currentImageIndex = calculateTargetIndex(
      event,
      this.buttons,
      this.currentImageIndex,
    );
    hideImages(this.images, this.buttons, this.currentImageIndex);

    return this;
  }
}

export { Carousel };
