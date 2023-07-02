const showCurrentImage = (
  images: NodeListOf<Element> | never[],
  buttons: NodeListOf<Element> | never[],
  currentImageIndex: number,
) => {
  images[currentImageIndex].classList.remove('room-card__image_hide');
  buttons[currentImageIndex].classList.add('room-card__button_target');
};

const hideImages = (
  images: NodeListOf<Element> | never[],
  buttons: NodeListOf<Element> | never[],
  currentImageIndex: number,
) => {
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
  hideImages,
  calculateTargetIndex,
  calculateBackIndex,
  calculateNextIndex,
};
