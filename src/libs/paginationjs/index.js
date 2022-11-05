import 'paginationjs';
import arrows from './arrows.json';

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
      dataSource,
      pageSize: 12,
      pageRange: 1,
      prevText: arrows.arrowBack,
      nextText: arrows.arrowNext,
      callback,
    };

    this.$node.pagination(config);
  }
}

export default Paginationjs;
