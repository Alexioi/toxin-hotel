import { Dom } from './type';
import { cssSelectors } from './constants';

const initNodes = (root: Element) => {
  const images = root.querySelectorAll(cssSelectors.images);
  const back = root.querySelector(cssSelectors.back);
  const next = root.querySelector(cssSelectors.next);
  const buttons = root.querySelectorAll(cssSelectors.buttons);

  return { root, images, back, next, buttons };
};

const showCurrentImage = (
  images: NodeListOf<Element> | never[],
  buttons: NodeListOf<Element> | never[],
  currentImageIndex: number,
) => {
  images[currentImageIndex].classList.remove('room-card__image_hide');
  buttons[currentImageIndex].classList.add('room-card__button_target');
};

const hideImages = (dom: Dom, currentImageIndex: number) => {
  const { images, buttons } = dom;

  images.forEach((node) => {
    node.classList.add('room-card__image_hide');
  });
  buttons.forEach((node) => {
    node.classList.remove('room-card__button_target');
  });

  showCurrentImage(images, buttons, currentImageIndex);
};

const calculateTargetIndex = (
  event: Event,
  buttons: NodeListOf<Element> | never[],
  currentIndex: number,
) => {
  if (event.target instanceof Element) {
    const buttonIndex = [...buttons].indexOf(event.target);

    return buttonIndex;
  }

  return currentIndex;
};

const calculateBackIndex = (currentIndex: number, quantityIndex: number) => {
  return currentIndex === 0 ? quantityIndex : currentIndex - 1;
};

const calculateNextIndex = (currentIndex: number, quantityIndex: number) => {
  return currentIndex === quantityIndex ? 0 : currentIndex + 1;
};

export {
  initNodes,
  hideImages,
  calculateTargetIndex,
  calculateBackIndex,
  calculateNextIndex,
};
