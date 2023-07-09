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

const isJQueryWithPaginationjs = (
  element: JQuery<Element>,
): element is JQueryWithPaginationjs => {
  return 'pagination' in element;
};

type JQueryWithDelegateTarget = JQuery & { delegateTarget: HTMLElement };

class Paginationjs {
  private root: Element;

  private range: Element;

  private count: number;

  constructor(root: Element, range: Element, count: number) {
    this.root = root;
    this.range = range;
    this.count = count;

    this.init();
  }

  private init() {
    const callback = (data: number[]) => {
      const [firstItem] = data;
      const lastItem = data[data.length - 1];
      if (firstItem === lastItem) {
        this.range.innerHTML = String(lastItem);
        return;
      }

      this.range.innerHTML = `${firstItem} - ${lastItem}`;
    };

    const dataSource = (done: (result: number[]) => void) => {
      const result = [...Array(this.count)].map((e, i) => {
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

    const $root = $(this.root);

    if (isJQueryWithPaginationjs($root)) {
      $root.pagination(config);
    }

    return this;
  }
}

export { Paginationjs, JQueryWithPaginationjs };
