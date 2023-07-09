import { cssSelectors } from './constants';
import {
  closeSubNavigationListOnClickOutsideBorders,
  toggleMobileNavigation,
  toggleSubNavigationList,
} from './methods';

class Header {
  private root: Element;

  private burgerButton: Element | null = null;

  private subNavigationLists: NodeListOf<Element> | never[] = [];

  private navigationButtons: NodeListOf<Element> | never[] = [];

  constructor(root: Element) {
    this.root = root;

    this.handleBurgerButtonClick = this.handleBurgerButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleNavigationButtonClick =
      this.handleNavigationButtonClick.bind(this);

    this.init();
  }

  private init() {
    this.initNodes().attachEventHandlers();

    return this;
  }

  private initNodes() {
    this.burgerButton = this.root.querySelector(cssSelectors.burgerButton);
    this.subNavigationLists = this.root.querySelectorAll(
      cssSelectors.subNavigationLists,
    );
    this.navigationButtons = this.root.querySelectorAll(
      cssSelectors.navigationButtons,
    );

    return this;
  }

  private attachEventHandlers() {
    this.burgerButton?.addEventListener('click', this.handleBurgerButtonClick);
    this.navigationButtons.forEach((navigationButton) => {
      navigationButton.addEventListener(
        'click',
        this.handleNavigationButtonClick,
      );
    });
    document.addEventListener('click', this.handleDocumentClick);

    return this;
  }

  private handleDocumentClick(event: Event) {
    closeSubNavigationListOnClickOutsideBorders(
      event,
      this.navigationButtons,
      this.subNavigationLists,
    );
  }

  private handleNavigationButtonClick(event: Event) {
    toggleSubNavigationList(
      event,
      this.navigationButtons,
      this.subNavigationLists,
    );
  }

  private handleBurgerButtonClick() {
    toggleMobileNavigation(this.root);
  }
}

export { Header };
