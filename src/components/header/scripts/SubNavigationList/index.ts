import { helpers } from '@helpers';

import { cssSelectors } from '../constants';
import {
  closeSubNavigationList,
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

  private init(root: Element): {
    dom: Dom;
    props: {
      isOpened: boolean;
    };
  } {
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

    const isOpened = toggleSubNavigationList(
      subNavigationList,
      this.props.isOpened,
    );

    this.props = { isOpened };
  }

  private handleDocumentClick(event: Event) {
    const { navigationButton, subNavigationList } = this.dom;

    const elements = [subNavigationList, navigationButton];

    if (helpers.isElementsIncludeNode(event, elements)) {
      return;
    }

    closeSubNavigationList(subNavigationList);

    this.props = { isOpened: false };
  }
}

export { SubNavigationList };
