import {
  changeCounterValue,
  changeIsLiked,
  initNodes,
  initProps,
} from './methods';
import { Dom, Props } from './types';

class LikeButton {
  private dom: Dom;

  private props: Props;

  constructor(node: Element) {
    const { dom, props } = this.init(node);

    this.dom = dom;
    this.props = props;
  }

  private init(node: Element) {
    const root = node;
    const dom = initNodes(root);
    const props = initProps(dom);

    this.attachEventHandlers(dom);

    return { dom, props };
  }

  private attachEventHandlers(dom: Dom) {
    const { root } = dom;

    root.addEventListener('click', this.handleButtonClick.bind(this));

    return this;
  }

  private handleButtonClick() {
    const { root, counter } = this.dom;
    const { isLiked, value } = this.props;

    const newIsLiked = changeIsLiked(isLiked, root);

    const newValue = changeCounterValue(value, newIsLiked, counter);

    this.props = { isLiked: newIsLiked, value: newValue };
  }
}

export { LikeButton };
