/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
import 'paginationjs';
import arrow from '!raw-loader!@images/decorative/arrow.svg';

class Paginationjs {
  constructor($node, $startItem, $endItem, count) {
    this.$node = $node;
    this.$startItem = $startItem;
    this.$endItem = $endItem;
    this.count = count;

    this._init();
  }

  _init() {
    const callback = (data) => {
      this.$startItem.text(data[0]);
      this.$endItem.text(data[data.length - 1]);
    };

    const dataSource = (done) => {
      const result = [...Array(this.count)].map((e, i) => i + 1);

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
  }
}

export default Paginationjs;
