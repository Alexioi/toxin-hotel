import { helpers } from '@helpers';

import { Dom } from './type';
import { cssSelectors } from './constants';

const initNodes = (root: Element) => {
  const images = root.querySelectorAll(cssSelectors.images);
  const back = root.querySelector(cssSelectors.back);
  const next = root.querySelector(cssSelectors.next);
  const buttons = root.querySelectorAll(cssSelectors.buttons);

  if (!(root instanceof HTMLElement)) {
    throw new helpers.SearchElementError('room card back button equal null');
  }

  if (back === null) {
    throw new helpers.SearchElementError('room card back button equal null');
  }

  if (next === null) {
    throw new helpers.SearchElementError('room card next button equal null');
  }

  return { root, images, back, next, buttons };
};

const showCurrentImage = (
  images: NodeListOf<Element>,
  buttons: NodeListOf<Element>,
  currentImageIndex: number,
) => {
  images[currentImageIndex].classList.remove('room-card__image_hide');
  buttons[currentImageIndex].classList.add('room-card__button_target');
};

const hideImages = (dom: Dom, currentImageIndex: number) => {
  const { images, buttons } = dom;

  images.forEach((el) => {
    el.classList.add('room-card__image_hide');
  });
  buttons.forEach((el) => {
    el.classList.remove('room-card__button_target');
  });

  showCurrentImage(images, buttons, currentImageIndex);
};

const calculateTargetIndex = (
  event: Event,
  buttons: NodeListOf<Element>,
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
