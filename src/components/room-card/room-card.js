class Carousel {
  constructor(component) {
    this.component = component;

    this._init();
  }

  _init() {
    this._findElements();
    this._attachEventHandlers();
    this._hideImgs();
  }

  _findElements() {
    this.images = this.component.querySelectorAll('.js-room-card__image');
    this.back = this.component.querySelector('.js-room-card__arrow-button_action-back');
    this.next = this.component.querySelector('.js-room-card__arrow-button_action-next');
    this.buttons = this.component.querySelectorAll('.js-room-card__button');
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
    let { currentImage, quantityImage } = this.component.dataset;

    currentImage = currentImage === '0' ? quantityImage : Number(currentImage) - 1;

    this.component.dataset.currentImage = currentImage;
    this._hideImgs();
  }

  _goToNextImg() {
    let { currentImage, quantityImage } = this.component.dataset;

    currentImage = currentImage === quantityImage ? 0 : Number(currentImage) + 1;

    this.component.dataset.currentImage = currentImage;
    this._hideImgs();
  }

  _moveTargetImg() {
    const { buttonNumber } = event.target.dataset;
    this.component.dataset.currentImage = buttonNumber;
    this._hideImgs();
  }

  _hideImgs() {
    this.images.forEach((node) => node.classList.add('room-card__image_hide'));
    this.buttons.forEach((node) => node.classList.remove('room-card__button_target'));
    this._showCurrentImg();
  }

  _showCurrentImg() {
    const { currentImage } = this.component.dataset;
    this.images[currentImage].classList.remove('room-card__image_hide');
    this.buttons[currentImage].classList.add('room-card__button_target');
  }
}

(() => {
  document.querySelectorAll('.js-room-card__carousel').forEach((node) => {
    new Carousel(node);
  });
})();
