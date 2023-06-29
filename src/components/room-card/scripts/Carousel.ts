import cssSelectors from './constants';

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

    this.goToBackImg = this.goToBackImg.bind(this);
    this.goToNextImg = this.goToNextImg.bind(this);
    this.moveTargetImg = this.moveTargetImg.bind(this);

    this.init();
  }

  private init() {
    if (this.root instanceof HTMLElement) {
      this.currentImageIndex = Number(this.root.dataset.currentImage);
      this.quantityImageIndex = Number(this.root.dataset.quantityImage);
    }

    this.findAndInitElements();
    this.attachEventHandlers();
    this.hideImages();
  }

  private findAndInitElements() {
    this.images = this.root.querySelectorAll(cssSelectors.images);
    this.back = this.root.querySelector(cssSelectors.back);
    this.next = this.root.querySelector(cssSelectors.next);
    this.buttons = this.root.querySelectorAll(cssSelectors.buttons);
  }

  private attachEventHandlers() {
    this.back?.addEventListener('click', this.goToBackImg);
    this.next?.addEventListener('click', this.goToNextImg);
    this.buttons.forEach((node) => {
      node.addEventListener('click', this.moveTargetImg);
    });
  }

  private goToBackImg() {
    const currentImageIndex =
      this.currentImageIndex === 0
        ? this.quantityImageIndex
        : this.currentImageIndex - 1;

    this.currentImageIndex = currentImageIndex;

    this.hideImages();
  }

  private goToNextImg() {
    const currentImageIndex =
      this.currentImageIndex === this.quantityImageIndex
        ? 0
        : this.currentImageIndex + 1;

    this.currentImageIndex = currentImageIndex;
    this.hideImages();
  }

  private moveTargetImg(event: Event) {
    if (event.target instanceof Element) {
      const buttonIndex = [...this.buttons].indexOf(event.target);

      this.currentImageIndex = buttonIndex;
      this.hideImages();
    }
  }

  private hideImages() {
    this.images.forEach((node) => {
      node.classList.add('room-card__image_hide');
    });
    this.buttons.forEach((node) => {
      node.classList.remove('room-card__button_target');
    });
    this.showCurrentImg();
  }

  private showCurrentImg() {
    this.images[this.currentImageIndex].classList.remove(
      'room-card__image_hide',
    );
    this.buttons[this.currentImageIndex].classList.add(
      'room-card__button_target',
    );
  }
}

export default Carousel;
