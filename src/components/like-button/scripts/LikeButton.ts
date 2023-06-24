import cssSelectors from './constants';
import calculateCounterValue from './methods';

class LikeButton {
  private root: Element;

  private counter: Element | null = null;

  private value: number = 0;

  private isLiked: boolean = false;

  constructor(root: Element) {
    this.root = root;

    this.init();
  }

  private init() {
    this.findAndInitElements()
      .attachEventHandlers()
      .initCounterValue()
      .initIsLiked();
  }

  private findAndInitElements() {
    this.counter = this.root.querySelector(cssSelectors.counter);

    return this;
  }

  private attachEventHandlers() {
    this.root.addEventListener('click', this.handleButtonClick.bind(this));
    return this;
  }

  private handleButtonClick() {
    this.changeButtonStyle();
    this.changeCounterValue();
  }

  private initCounterValue() {
    const value = Number(this.counter?.innerHTML);

    if (value > 0) {
      this.value = value;
    }

    return this;
  }

  private initIsLiked() {
    if (this.value === 0) {
      this.removeButtonLikedStyle();
      return this;
    }

    this.isLiked = this.root.classList.contains('like-button_liked');

    return this;
  }

  private removeButtonLikedStyle() {
    this.root.classList.remove('like-button_liked');
    this.isLiked = false;
  }

  private changeButtonStyle() {
    this.root.classList.toggle('like-button_liked');
    this.isLiked = !this.isLiked;
  }

  private changeCounterValue() {
    const value = calculateCounterValue(this.value, this.isLiked);

    this.value = value;

    if (this.counter !== null) {
      if (value > 999) {
        this.counter.innerHTML = '999+';
      } else {
        this.counter.innerHTML = String(value);
      }
    }
  }
}

export default LikeButton;
