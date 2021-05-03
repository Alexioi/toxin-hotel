import "./like-button.scss";

class LikeButton {
  constructor(component) {
    this.component = component;
    this.content = this.component.querySelector(".like-button__content");
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.component.addEventListener("click", () => {
      this._changeButtonStyle();
      this._setCounterLikes();
    });
  }

  _changeButtonStyle() {
    this.component.classList.toggle("like-button_liked");
  }

  _setCounterLikes() {
    if (this.component.classList.contains("like-button_liked")) {
      this.content.innerHTML++;
    } else {
      this.content.innerHTML--;
    }
  }
}

(() => {
  document.querySelectorAll(".js-like-button").forEach((node) => {
    new LikeButton(node);
  });
})();
