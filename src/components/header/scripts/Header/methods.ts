import { cssSelectors } from '../constants';

const initNodes = (root: Element) => {
  const burgerButton = root.querySelector(cssSelectors.burgerButton);

  return { root, burgerButton };
};

const toggleMobileNavigation = (node: Element, isOpened: boolean) => {
  if (isOpened) {
    node.classList.remove('header__mobile-navigation-opened');

    return false;
  }

  node.classList.add('header__mobile-navigation-opened');

  return true;
};

export { initNodes, toggleMobileNavigation };
