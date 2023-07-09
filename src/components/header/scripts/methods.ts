import { helpers } from '@helpers/index';

const closeSubNavigationList = (node: Element | null) => {
  node?.classList.remove('header__sub-navigation-list_opened');
};

const toggleMobileNavigation = (node: Element) => {
  node.classList.toggle('header__mobile-navigation-opened');
};

const toggleSubNavigationList = (
  event: Event,
  navigationButtons: NodeListOf<Element> | never[],
  subNavigationLists: NodeListOf<Element> | never[],
) => {
  if (event.currentTarget instanceof Element) {
    const targetIndex = [...navigationButtons].indexOf(event.currentTarget);

    subNavigationLists[targetIndex].classList.toggle(
      'header__sub-navigation-list_opened',
    );
  }
};

const closeSubNavigationListOnClickOutsideBorders = (
  event: Event,
  navigationButtons: NodeListOf<Element> | never[],
  subNavigationLists: NodeListOf<Element> | never[],
) => {
  subNavigationLists.forEach((list, index) => {
    const elements = [list, navigationButtons[index]];

    if (!helpers.isElementsIncludeNode(event, elements)) {
      closeSubNavigationList(list);
    }
  });
};

export {
  toggleMobileNavigation,
  toggleSubNavigationList,
  closeSubNavigationListOnClickOutsideBorders,
};
