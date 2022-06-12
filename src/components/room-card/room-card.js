class Carousel {
  constructor(node) {
    this.node = node;

    this._init();
  }

  _init() {
    this._findElements();
    this._attachEventHandlers();
    this._hideImages();
  }

  _findElements() {
    this.images = this.node.querySelectorAll('.js-room-card__image');
    this.back = this.node.querySelector('.js-room-card__arrow-button_action-back');
    this.next = this.node.querySelector('.js-room-card__arrow-button_action-next');
    this.buttons = this.node.querySelectorAll('.js-room-card__button');
  }

  _attachEventHandlers() {
    this.back.addEventListener('click', () => {
      this._goToBackImg();
    });
    this.next.addEventListener('click', () => {
      this._goToNextImg();
    });
    this.buttons.forEach((node) => {
      node.addEventListener('click', () => this._moveTargetImg());
    });
  }

  _goToBackImg() {
    let { currentImage, quantityImage } = this.node.dataset;

    currentImage = currentImage === '0' ? quantityImage : Number(currentImage) - 1;

    this.node.dataset.currentImage = currentImage;
    this._hideImages();
  }

  _goToNextImg() {
    let { currentImage, quantityImage } = this.node.dataset;

    currentImage = currentImage === quantityImage ? 0 : Number(currentImage) + 1;

    this.node.dataset.currentImage = currentImage;
    this._hideImages();
  }

  _moveTargetImg() {
    const { buttonNumber } = event.target.dataset;
    this.node.dataset.currentImage = buttonNumber;
    this._hideImages();
  }

  _hideImages() {
    this.images.forEach((node) => node.classList.add('room-card__image_hide'));
    this.buttons.forEach((node) => node.classList.remove('room-card__button_target'));
    this._showCurrentImg();
  }

  _showCurrentImg() {
    const { currentImage } = this.node.dataset;
    this.images[currentImage].classList.remove('room-card__image_hide');
    this.buttons[currentImage].classList.add('room-card__button_target');
  }
}

(() => {
  document.querySelectorAll('.js-room-card__carousel').forEach((node) => {
    new Carousel(node);
  });
})();
