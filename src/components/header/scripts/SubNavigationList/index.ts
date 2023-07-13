import { cssSelectors } from '../constants';
import {
  closeSubNavigationListOnClickOutsideBorder,
  initNodes,
  toggleSubNavigationList,
} from './methods';
import { Dom } from './types';

class SubNavigationList {
  private dom: Dom;

  private props: {
    isOpened: boolean;
  };

  constructor(node: Element) {
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleNavigationButtonClick =
      this.handleNavigationButtonClick.bind(this);

    const { dom, props } = this.init(node);

    this.dom = dom;
    this.props = props;
  }

  private init(root: Element) {
    const dom = initNodes(root);

    this.attachEventHandlers(dom);

    const isOpened = root.classList.contains(cssSelectors.subNavigationLists);

    return { dom, props: { isOpened } };
  }

  private attachEventHandlers(dom: Dom) {
    const { navigationButton } = dom;

    navigationButton?.addEventListener(
      'click',
      this.handleNavigationButtonClick,
    );

    document.addEventListener('click', this.handleDocumentClick);

    return this;
  }

  private handleNavigationButtonClick() {
    const { subNavigationList } = this.dom;

    // @ts-ignore
    const isOpened = toggleSubNavigationList(
      // @ts-ignore
      subNavigationList,
      this.props.isOpened,
    );

    this.props = { isOpened };
  }

  private handleDocumentClick(event: Event) {
    const { navigationButton, subNavigationList } = this.dom;

    closeSubNavigationListOnClickOutsideBorder(
      event,
      navigationButton,
      // @ts-ignore
      subNavigationList,
    );
  }
}

export { SubNavigationList };
