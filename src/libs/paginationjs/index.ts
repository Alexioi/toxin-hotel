import $ from 'jquery';
import 'paginationjs';

import arrow from '!raw-loader!@images/decorative/arrow.svg';

interface Config {
  pageSize: number;
  pageRange: number;
  prevText: string;
  nextText: string;
  callback: (data: number[]) => void;
  dataSource: (done: (result: number[]) => void) => void;
  afterPageOnClick: (node: JQueryWithDelegateTarget) => void;
  afterNextOnClick: (node: JQueryWithDelegateTarget) => void;
  afterPreviousOnClick: (node: JQueryWithDelegateTarget) => void;
}

interface JQueryWithPaginationjs extends JQuery<Element> {
  pagination(config: Config): void;
}

const isElementWithPaginationjs = (
  element: JQuery<Element>,
): element is JQueryWithPaginationjs => {
  return 'pagination' in element;
};

type JQueryWithDelegateTarget = JQuery & { delegateTarget: HTMLElement };

class Paginationjs {
  private dom: {
    root: Element;
    range: Element;
  };

  private props: {
    count: number;
  };

  constructor(node: Element, range: Element, count: number) {
    this.dom = { root: node, range };
    this.props = { count };

    this.init();
  }

  private init() {
    const callback = (data: number[]) => {
      const [firstItem] = data;
      const lastItem = data[data.length - 1];
      if (firstItem === lastItem) {
        this.dom.range.innerHTML = String(lastItem);
        return;
      }

      this.dom.range.innerHTML = `${firstItem} - ${lastItem}`;
    };

    const dataSource = (done: (result: number[]) => void) => {
      const result = [...Array(this.props.count)].map((e, i) => {
        return i + 1;
      });

      done(result);
    };

    const iconBack = `<svg class="paginationjs__icon paginationjs__icon_back">${arrow}</svg>`;
    const iconNext = `<svg class="paginationjs__icon">${arrow}</svg>`;

    const afterPageOnClick = (node: JQueryWithDelegateTarget) => {
      node.delegateTarget
        .querySelector('.active')
        ?.nextElementSibling?.querySelector('a')
        ?.focus();
    };

    const afterNextOnClick = (node: JQueryWithDelegateTarget) => {
      node.delegateTarget
        .querySelector('.paginationjs-next')
        ?.querySelector('a')
        ?.focus();
    };

    const afterPreviousOnClick = (node: JQueryWithDelegateTarget) => {
      node.delegateTarget
        .querySelector('.paginationjs-prev')
        ?.querySelector('a')
        ?.focus();
    };

    const config = {
      pageSize: 12,
      pageRange: 1,
      prevText: `<span class="paginationjs__arrow">${iconBack}</span>`,
      nextText: `<span class="paginationjs__arrow">${iconNext}</span>`,
      callback,
      dataSource,
      afterPageOnClick,
      afterNextOnClick,
      afterPreviousOnClick,
    };

    const $root = $(this.dom.root);

    if (isElementWithPaginationjs($root)) {
      $root.pagination(config);
    }

    return this;
  }
}

export { Paginationjs, JQueryWithPaginationjs };
