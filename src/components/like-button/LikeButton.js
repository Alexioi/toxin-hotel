import cssSelectors from './constants';

class LikeButton {
  constructor($component) {
    this.$component = $component;

    this._init();
  }

  _init() {
    this._findElements();
    this._attachEventHandlers();
    this.counterValue = this._getCounterValue();
    this._changeCounterValue();
  }

  _findElements() {
    this.$counter = this.$component.find(cssSelectors.counter);
  }

  _attachEventHandlers() {
    this.$component.on('click', this._onClickButton.bind(this));
  }

  _onClickButton() {
    this._changeButtonStyle();
    this._changeCounterValue();
  }

  _getCounterValue() {
    const isLiked = this.$component.hasClass('like-button_liked');

    if (isLiked) {
      return Number(this.$counter.text()) - 1;
    }

    return Number(this.$counter.text());
  }

  _changeButtonStyle() {
    this.$component.toggleClass('like-button_liked');
  }

  _changeCounterValue() {
    const isLiked = this.$component.hasClass('like-button_liked');
    const newCounter = LikeButton._calculateCounterValue(
      this.counterValue,
      isLiked,
    );

    this.$counter.text(newCounter);
  }

  static _calculateCounterValue(value, isLiked) {
    const newValue = isLiked ? value + 1 : value;

    if (newValue >= 999) {
      return '999+';
    }

    return newValue;
  }
}

export default LikeButton;
