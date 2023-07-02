import cssSelectors from './constants';
import {
  changeCounterValue,
  changeIsLiked,
  initCounterValue,
  initIsLiked,
} from './methods';

class LikeButton {
  private root: Element;

  private counter: Element | null = null;

  private value = 0;

  private isLiked = false;

  constructor(root: Element) {
    this.root = root;

    this.init();
  }

  private init() {
    this.initNodes().attachEventHandlers().initParameters();

    return this;
  }

  private initNodes() {
    this.counter = this.root.querySelector(cssSelectors.counter);

    return this;
  }

  private attachEventHandlers() {
    this.root.addEventListener('click', this.handleButtonClick.bind(this));

    return this;
  }

  private initParameters() {
    this.value = initCounterValue(this.counter);
    this.isLiked = initIsLiked(this.root, this.value);

    return this;
  }

  private handleButtonClick() {
    this.isLiked = changeIsLiked(this.isLiked, this.root);

    this.value = changeCounterValue(this.value, this.isLiked, this.counter);

    return this;
  }
}

export default LikeButton;
