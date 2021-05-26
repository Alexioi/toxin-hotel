import "./room-card.scss";

class Carousel {
  constructor(component) {
    this.component = component;
    this.imgs = this.component.querySelectorAll(".js-room-card__img");
    this.back = this.component.querySelector(".js-room-card__back");
    this.next = this.component.querySelector(".js-room-card__next");
    this.buttons = this.component.querySelectorAll(".js-room-card__button");
    this._attachEventHandlers();
    this._hideImgs();
  }

  _attachEventHandlers() {
    this.back.addEventListener("click", () => {
      this._goToBackImg();
    });
    this.next.addEventListener("click", () => {
      this._goToNextImg();
    });
    this.buttons.forEach((node) => {
      node.addEventListener("click", () => this._moveTargetImg());
    });
  }

  _goToBackImg() {
    let currentImg = this.component.dataset.currentImg;
    let quantityImg = this.component.dataset.quantityImg;
    currentImg--;
    if (currentImg < 0) {
      currentImg = quantityImg;
    }
    this.component.dataset.currentImg = currentImg;
    this._hideImgs();
  }

  _goToNextImg() {
    let currentImg = this.component.dataset.currentImg;
    let quantityImg = this.component.dataset.quantityImg;
    currentImg++;
    if (currentImg > quantityImg) {
      currentImg = 0;
    }
    this.component.dataset.currentImg = currentImg;
    this._hideImgs();
  }

  _moveTargetImg() {
    let targetImg = event.target.dataset.buttonNumber;
    this.component.dataset.currentImg = targetImg;
    this._hideImgs();
  }

  _hideImgs() {
    this.imgs.forEach((node) => node.classList.add("room-card__img_hide"));
    this._showCurrentImg();
  }

  _showCurrentImg() {
    let currentImg = this.component.dataset.currentImg;
    this.imgs[currentImg].classList.remove("room-card__img_hide");
  }
}

(() => {
  document.querySelectorAll(".js-room-card__carousel").forEach((node) => {
    new Carousel(node);
  });
})();
