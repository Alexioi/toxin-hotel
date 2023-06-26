import helpers from '@helpers/index';

import cssSelectors from './constants';

const closeSubNavigationList = (node: Element | null) => {
  node?.classList.remove('header__sub-navigation-list_opened');
};

class Header {
  private root: Element;

  private button: Element | null = null;

  private subNavigationLists: NodeListOf<Element> | never[] = [];

  private navigationButtons: NodeListOf<Element> | never[] = [];

  constructor(root: Element) {
    this.root = root;

    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggleSubNavigationList = this.toggleSubNavigationList.bind(this);

    this.init();
  }

  private init() {
    this.findsElements();

    this.attachEventHandlers();
  }

  private findsElements() {
    this.button = this.root.querySelector(cssSelectors.button);
    this.subNavigationLists = this.root.querySelectorAll(
      cssSelectors.subNavigationLists,
    );
    this.navigationButtons = this.root.querySelectorAll(
      cssSelectors.navigationButtons,
    );
  }

  private attachEventHandlers() {
    this.button?.addEventListener('click', this.toggleNavigation);
    this.navigationButtons.forEach((navigationButton) => {
      navigationButton.addEventListener('click', this.toggleSubNavigationList);
    });
    document.addEventListener('click', this.handleDocumentClick);
  }

  private handleDocumentClick(event: Event) {
    this.subNavigationLists.forEach((list, index) => {
      const elements = [list, this.navigationButtons[index]];

      if (!helpers.isElementsIncludeNode(event, elements)) {
        closeSubNavigationList(list);
      }
    });
  }

  private toggleSubNavigationList(event: Event) {
    if (event.currentTarget instanceof Element) {
      const targetIndex = [...this.navigationButtons].indexOf(
        event.currentTarget,
      );

      this.subNavigationLists[targetIndex].classList.toggle(
        'header__sub-navigation-list_opened',
      );
    }
  }

  private toggleNavigation() {
    this.root.classList.toggle('header__mobile-navigation-opened');
  }
}

export default Header;
