import { helpers } from '@helpers';

import { cssSelectors } from '../constants';

const initNodes = (root: Element) => {
  const burgerButton = root.querySelector(cssSelectors.burgerButton);

  if (burgerButton === null) {
    throw new helpers.SearchElementError('header burger button equal null');
  }

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
