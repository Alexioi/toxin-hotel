import { helpers } from '@helpers';
import { cssSelectors } from '../constants';

const initNodes = (root: Element) => {
  const subNavigationList = root.querySelector(cssSelectors.subNavigationLists);

  if (subNavigationList === null) {
    throw new helpers.SearchElementError(
      'header sub navigation list equal null',
    );
  }
  const navigationButton = root.querySelector(cssSelectors.navigationButtons);

  if (navigationButton === null) {
    throw new helpers.SearchElementError('header navigation button equal null');
  }

  return { root, subNavigationList, navigationButton };
};

const toggleSubNavigationList = (
  subNavigationList: Element,
  isOpened: boolean,
): boolean => {
  if (isOpened) {
    subNavigationList.classList.remove('header__sub-navigation-list_opened');
    return false;
  }

  subNavigationList.classList.add('header__sub-navigation-list_opened');
  return true;
};

const closeSubNavigationList = (node: Element) => {
  node.classList.remove('header__sub-navigation-list_opened');
};

// const closeSubNavigationListOnClickOutsideBorder = (
//   event: Event,
//   navigationButton: Element,
//   subNavigationList: Element,
// ) => {
//   const elements = [subNavigationList, navigationButton];

//   if (helpers.isElementsIncludeNode(event, elements)) {
//     return false;
//   }

//   closeSubNavigationList(subNavigationList);

//   return true;
// };

export {
  initNodes,
  toggleSubNavigationList,
  // closeSubNavigationListOnClickOutsideBorder,
  closeSubNavigationList,
};
