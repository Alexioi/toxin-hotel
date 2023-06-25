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
    this.onClickDocument = this.onClickDocument.bind(this);

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
    this.navigationButtons.forEach((navigationButton, index) => {
      navigationButton.addEventListener(
        'click',
        this.toggleSubNavigationList.bind(this, index),
      );
    });
    document.addEventListener('click', this.onClickDocument);
  }

  private onClickDocument(event: Event) {
    this.subNavigationLists.forEach((list, index) => {
      const elements = [list, this.navigationButtons[index]];

      if (!helpers.isElementsIncludeNode(event, elements)) {
        closeSubNavigationList(list);
      }
    });
  }

  private toggleSubNavigationList(targetIndex: number) {
    this.subNavigationLists[targetIndex].classList.toggle(
      'header__sub-navigation-list_opened',
    );
  }

  private toggleNavigation() {
    this.root.classList.toggle('header__mobile-navigation-opened');
  }
}

export default Header;
