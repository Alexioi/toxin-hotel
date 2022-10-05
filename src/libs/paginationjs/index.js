import 'paginationjs';

const dataSource = (done) => {
  const result = [...Array(180)].map((e, i) => i + 1);

  done(result);
};

const config = {
  dataSource,
  pageSize: 12,
  pageRange: 1,
  prevText: '<span class="material-icons">arrow_back</span>',
  nextText: '<span class="material-icons">arrow_forward</span>',
};

class Paginationjs {
  constructor($node, $startItem, $endItem) {
    this.$node = $node;
    this.$startItem = $startItem;
    this.$endItem = $endItem;

    this._init();
  }

  _init() {
    config.callback = (data) => {
      this.$startItem.text(data[0]);
      this.$endItem.text(data[data.length - 1]);
    };

    this.$node.pagination(config);
  }
}

export default Paginationjs;
