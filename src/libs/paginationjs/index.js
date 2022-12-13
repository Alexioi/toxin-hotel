/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
import 'paginationjs';
import arrowBack from '!raw-loader!@images/decorative/arrow-back.svg';
import arrowForward from '!raw-loader!@images/decorative/arrow-forward.svg';

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

    const config = {
      pageSize: 12,
      pageRange: 1,
      prevText: `<span class="paginationjs__arrow"><svg>${arrowBack}</svg></span>`,
      nextText: `<span class="paginationjs__arrow"><svg>${arrowForward}</svg></span>`,
      callback,
      dataSource,
    };

    this.$node.pagination(config);
  }
}

export default Paginationjs;
