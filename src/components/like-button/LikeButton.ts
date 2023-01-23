import cssSelectors from './constants';

const calculateCounterValue = (value: number, isLiked: boolean): string => {
  const newValue = isLiked ? value + 1 : value;

  if (newValue >= 999) {
    return '999+';
  }

  return String(newValue);
};

class LikeButton {
  private component: Element;

  private counter!: Element | null;

  private counterValue!: number;

  constructor($component: Element) {
    this.component = $component;

    this.init();
  }

  private init() {
    this.findElements();
    this.attachEventHandlers();
    this.counterValue = this._getCounterValue();
    this.changeCounterValue();
  }

  private findElements() {
    this.counter = this.component.querySelector(cssSelectors.counter);
  }

  private attachEventHandlers() {
    this.component.addEventListener('click', this.onClickButton.bind(this));
  }

  private onClickButton() {
    this.changeButtonStyle();
    this.changeCounterValue();
  }

  _getCounterValue() {
    const isLiked = this.component.classList.contains('like-button_liked');

    if (isLiked) {
      return Number(this.counter?.innerHTML) - 1;
    }

    return Number(this.counter?.innerHTML);
  }

  private changeButtonStyle() {
    this.component.classList.toggle('like-button_liked');
  }

  private changeCounterValue() {
    const isLiked = this.component.classList.contains('like-button_liked');
    const newCounter = calculateCounterValue(this.counterValue, isLiked);

    if (this.counter !== null) {
      this.counter.innerHTML = newCounter;
    }
  }
}

export default LikeButton;
