import "./like-button.scss";
import $ from "jquery";

class LikeButton {
  constructor($component) {
    this.$component = $component;
    this.$componentText = $($component).children(".like-button__content");
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component.on("click", () => {
      let text = this.$componentText.text();
      if (this.$component.hasClass("like-button_liked")) {
        this.$component.toggleClass("like-button_liked");
        this.$componentText.text(text - 1);
      } else {
        this.$component.toggleClass("like-button_liked");
        this.$componentText.text(+text + 1);
      }
    });
  }
}

$(() => {
  $(".js-like-button").each((index, node) => {
    new LikeButton($(node));
  });
});
