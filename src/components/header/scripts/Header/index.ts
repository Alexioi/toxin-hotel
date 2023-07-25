import { SubNavigationList } from '../SubNavigationList';
import { cssSelectors } from '../constants';
import { initNodes, toggleMobileNavigation } from './methods';
import { Dom } from './type';

class Header {
  private dom: Dom;

  private props: {
    isOpened: boolean;
  };

  constructor(node: Element) {
    this.handleBurgerButtonClick = this.handleBurgerButtonClick.bind(this);

    const { dom, props } = this.init(node);

    this.dom = dom;
    this.props = props;
  }

  private init(root: Element) {
    const dom = initNodes(root);

    this.attachEventHandlers(dom);

    const isOpened = root.classList.contains(cssSelectors.subNavigationLists);

    root.querySelectorAll(cssSelectors.navigationMenu).forEach((node) => {
      new SubNavigationList(node);
    });

    return { dom, props: { isOpened } };
  }

  private attachEventHandlers(dom: Dom) {
    const { burgerButton } = dom;
    burgerButton.addEventListener('click', this.handleBurgerButtonClick);

    return this;
  }

  private handleBurgerButtonClick() {
    const isOpened = toggleMobileNavigation(this.dom.root, this.props.isOpened);

    this.props = { isOpened };
  }
}

export { Header };
