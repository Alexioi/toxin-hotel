import {
  closeSubNavigationListOnClickOutsideBorders,
  initNodes,
  toggleMobileNavigation,
  toggleSubNavigationList,
} from './methods';
import { Dom } from './type';

class Header {
  private dom: Dom;

  constructor(node: Element) {
    this.handleBurgerButtonClick = this.handleBurgerButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleNavigationButtonClick =
      this.handleNavigationButtonClick.bind(this);

    const { dom } = this.init(node);

    this.dom = dom;
  }

  private init(node: Element) {
    const root = node;
    const dom = initNodes(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers(dom: Dom) {
    const { burgerButton, navigationButtons } = dom;
    burgerButton?.addEventListener('click', this.handleBurgerButtonClick);
    navigationButtons.forEach((navigationButton) => {
      navigationButton.addEventListener(
        'click',
        this.handleNavigationButtonClick,
      );
    });
    document.addEventListener('click', this.handleDocumentClick);

    return this;
  }

  private handleNavigationButtonClick(event: Event) {
    const { navigationButtons, subNavigationLists } = this.dom;

    toggleSubNavigationList(event, navigationButtons, subNavigationLists);
  }

  private handleBurgerButtonClick() {
    toggleMobileNavigation(this.dom.root);
  }

  private handleDocumentClick(event: Event) {
    const { navigationButtons, subNavigationLists } = this.dom;

    closeSubNavigationListOnClickOutsideBorders(
      event,
      navigationButtons,
      subNavigationLists,
    );
  }
}

export { Header };
