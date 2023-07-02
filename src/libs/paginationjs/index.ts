import 'paginationjs';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import arrow from '!raw-loader!@images/decorative/arrow.svg';

interface Config {
  pageSize: number;
  pageRange: number;
  prevText: string;
  nextText: string;
  callback: (data: number[]) => void;
  dataSource: (done: (result: number[]) => void) => void;
  afterPageOnClick: () => void;
  afterNextOnClick: () => void;
  afterPreviousOnClick: () => void;
}

interface JQueryWithPaginationjs extends JQuery<Element> {
  pagination(config: Config): void;
}

class Paginationjs {
  private $node: JQueryWithPaginationjs;

  private $startItem: JQuery<Element>;

  private $endItem: JQuery<Element>;

  private count: number;

  constructor(
    $root: JQueryWithPaginationjs,
    startItem: Element,
    endItem: Element,
    count: number,
  ) {
    this.$node = $root;
    this.$startItem = $(startItem);
    this.$endItem = $(endItem);
    this.count = count;

    this.init();
  }

  private init() {
    const callback = (data: number[]) => {
      this.$startItem.text(data[0]);
      this.$endItem.text(data[data.length - 1]);
    };

    const dataSource = (done: (result: number[]) => void) => {
      const result = [...Array(this.count)].map((e, i) => {
        return i + 1;
      });

      done(result);
    };

    const iconBack = `<svg class="paginationjs__icon paginationjs__icon_back">${arrow}</svg>`;
    const iconNext = `<svg class="paginationjs__icon">${arrow}</svg>`;

    const afterPageOnClick = () => {
      this.$node.find('.active').next().find('a').focus();
    };

    const afterNextOnClick = () => {
      this.$node.find('.paginationjs-next').find('a').focus();
    };

    const afterPreviousOnClick = () => {
      this.$node.find('.paginationjs-prev').find('a').focus();
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

    this.$node.pagination(config);

    return this;
  }
}

export { Paginationjs, JQueryWithPaginationjs };
