import {
  calculateBackIndex,
  calculateNextIndex,
  calculateTargetIndex,
  hideImages,
  initNodes,
} from './methods';
import { Dom, Props } from './type';

class Carousel {
  private dom: Dom;

  private props: Props;

  constructor(node: Element) {
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleTargetButtonClick = this.handleTargetButtonClick.bind(this);

    const { dom, props } = this.init(node);

    this.dom = dom;
    this.props = props;
  }

  private init(root: Element): { dom: Dom; props: Props } {
    const dom = initNodes(root);

    const { currentImage, quantityImage } = dom.root.dataset;

    const currentImageIndex = Number(currentImage);
    const quantityImageIndex = Number(quantityImage);

    this.attachEventHandlers(dom);

    hideImages(dom, currentImageIndex);

    return { dom, props: { currentImageIndex, quantityImageIndex } };
  }

  private attachEventHandlers(dom: Dom) {
    const { back, next, buttons } = dom;

    back.addEventListener('click', this.handleBackButtonClick);
    next.addEventListener('click', this.handleNextButtonClick);
    buttons.forEach((el) => {
      el.addEventListener('click', this.handleTargetButtonClick);
    });

    return this;
  }

  private handleBackButtonClick() {
    const { currentImageIndex, quantityImageIndex } = this.props;

    const newCurrentImageIndex = calculateBackIndex(
      currentImageIndex,
      quantityImageIndex,
    );

    this.props = {
      currentImageIndex: newCurrentImageIndex,
      quantityImageIndex,
    };

    hideImages(this.dom, newCurrentImageIndex);
  }

  private handleNextButtonClick() {
    const { currentImageIndex, quantityImageIndex } = this.props;

    const newCurrentImageIndex = calculateNextIndex(
      currentImageIndex,
      quantityImageIndex,
    );

    this.props = {
      currentImageIndex: newCurrentImageIndex,
      quantityImageIndex,
    };

    hideImages(this.dom, newCurrentImageIndex);
  }

  private handleTargetButtonClick(event: Event) {
    const { currentImageIndex, quantityImageIndex } = this.props;

    const newCurrentImageIndex = calculateTargetIndex(
      event,
      this.dom.buttons,
      currentImageIndex,
    );

    this.props = {
      currentImageIndex: newCurrentImageIndex,
      quantityImageIndex,
    };

    hideImages(this.dom, newCurrentImageIndex);
  }
}

export { Carousel };
