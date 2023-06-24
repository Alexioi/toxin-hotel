import cssSelectors from './constants';

class Carousel {
  private root: Element;

  constructor(root: Element) {
    this.root = root;

    this._init();
  }

  _init() {
    this._findElements();
    this._attachEventHandlers();
    this._hideImages();
  }

  _findElements() {
    this.images = this.root.querySelectorAll(cssSelectors.images);
    this.back = this.root.querySelector(cssSelectors.back);
    this.next = this.root.querySelector(cssSelectors.next);
    this.buttons = this.root.querySelectorAll(cssSelectors.buttons);
  }

  _attachEventHandlers() {
    this.back.addEventListener('click', this._goToBackImg.bind(this));
    this.next.addEventListener('click', this._goToNextImg.bind(this));
    this.buttons.forEach((node) => {
      node.addEventListener('click', this._moveTargetImg.bind(this));
    });
  }

  _goToBackImg() {
    let currentImage = Number(this.root.dataset.currentImage);
    const { quantityImage } = this.root.dataset;

    currentImage = currentImage === 0 ? quantityImage : currentImage - 1;

    this.root.dataset.currentImage = currentImage;
    this._hideImages();
  }

  _goToNextImg() {
    let currentImage = Number(this.root.dataset.currentImage);
    const quantityImage = Number(this.root.dataset.quantityImage);

    currentImage = currentImage === quantityImage ? 0 : currentImage + 1;

    this.root.dataset.currentImage = currentImage;
    this._hideImages();
  }

  _moveTargetImg(event) {
    const { buttonNumber } = event.target.dataset;
    this.root.dataset.currentImage = buttonNumber;
    this._hideImages();
  }

  _hideImages() {
    this.images.forEach((node) => node.classList.add('room-card__image_hide'));
    this.buttons.forEach((node) => {
      node.classList.remove('room-card__button_target');
    });
    this._showCurrentImg();
  }

  _showCurrentImg() {
    const { currentImage } = this.root.dataset;
    this.images[currentImage].classList.remove('room-card__image_hide');
    this.buttons[currentImage].classList.add('room-card__button_target');
  }
}

export default Carousel;
