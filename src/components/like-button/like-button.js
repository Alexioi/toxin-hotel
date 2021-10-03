class LikeButton {
  constructor($component) {
    this.$component = $component;

    this._init();
  }

  _init() {
    this._findElements();
    this._attachEventHandlers();
    this._changeButtonIcon();
  }

  _findElements() {
    this.$icon = this.$component.find('.like-button__icon');
    this.$counter = this.$component.find('.like-button__counter');
  }

  _attachEventHandlers() {
    this.$component.on('click', () => {
      this._changeButtonStyle();
      this._changeButtonIcon();
      this._setCounterLikes();
    });
  }

  _changeButtonStyle() {
    this.$component.toggleClass('like-button_liked');
  }

  _changeButtonIcon() {
    const isLiked = this.$component.hasClass('like-button_liked');
    const icon = isLiked ? 'favorite' : 'favorite_border';

    this.$icon.text(icon);
  }

  _setCounterLikes() {
    const currentCounter = Number(this.$counter.text());
    const isLiked = this.$component.hasClass('like-button_liked');
    const newCounter = isLiked ? currentCounter + 1 : currentCounter - 1;

    this.$counter.text(newCounter);
  }
}

$(() => {
  $('.js-like-button').each((i, node) => {
    new LikeButton($(node));
  });
});
