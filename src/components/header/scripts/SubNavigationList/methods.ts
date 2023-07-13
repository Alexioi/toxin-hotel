import { helpers } from '@helpers';
import { cssSelectors } from '../constants';

const initNodes = (root: Element) => {
  const subNavigationList = root.querySelector(cssSelectors.subNavigationLists);
  const navigationButton = root.querySelector(cssSelectors.navigationButtons);

  return { root, subNavigationList, navigationButton };
};

const toggleSubNavigationList = (
  subNavigationList: Element,
  isOpened: boolean,
): boolean => {
  console.log(subNavigationList, isOpened);
  if (isOpened) {
    subNavigationList.classList.remove('header__sub-navigation-list_opened');
    return false;
  }

  subNavigationList.classList.add('header__sub-navigation-list_opened');
  return true;
};

const closeSubNavigationList = (node: Element | null) => {
  node?.classList.remove('header__sub-navigation-list_opened');
};

const closeSubNavigationListOnClickOutsideBorder = (
  event: Event,
  navigationButton: Element | null,
  subNavigationList: Element,
) => {
  const elements = [subNavigationList, navigationButton];

  if (helpers.isElementsIncludeNode(event, elements)) {
    return;
  }

  closeSubNavigationList(subNavigationList);
};

export {
  initNodes,
  toggleSubNavigationList,
  closeSubNavigationListOnClickOutsideBorder,
};
