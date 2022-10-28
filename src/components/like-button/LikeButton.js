import cssSelectors from './constants';

class LikeButton {
  constructor($component) {
    this.$component = $component;

    this._init();
  }

  _init() {
    this._findElements();
    this._attachEventHandlers();
  }

  _findElements() {
    this.$counter = this.$component.find(cssSelectors.counter);
  }

  _attachEventHandlers() {
    this.$component.on('click', this._onClickButton.bind(this));
  }

  _onClickButton() {
    this._changeButtonStyle();
    this._setCounterLikes();
  }

  _changeButtonStyle() {
    this.$component.toggleClass('like-button_liked');
  }

  _setCounterLikes() {
    const currentCounter = Number(this.$counter.text());
    const isLiked = this.$component.hasClass('like-button_liked');
    const newCounter = isLiked ? currentCounter + 1 : currentCounter - 1;

    this.$counter.text(newCounter);
  }
}

export default LikeButton;
