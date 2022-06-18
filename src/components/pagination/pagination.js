import 'paginationjs';

$(() => {
  const dataSource = (done) => {
    const result = [];
    for (let i = 1; i < 181; i = i + 1) {
      result.push(i);
    }
    done(result);
  };

  const config = {
    dataSource,
    pageSize: 12,
    pageRange: 1,
    prevText: '<span class="material-icons">arrow_back</span>',
    nextText: '<span class="material-icons">arrow_forward</span>',
  };

  class Pagination {
    constructor($component) {
      this.$component = $component;

      this._init();
    }

    _init() {
      this._findElements();
      this._createPlugin();
    }

    _findElements() {
      this.$plugin = this.$component.find('.js-pagination__plugin');
      this.$startItem = this.$component.find('.js-pagination__start-item');
      this.$endItem = this.$component.find('.js-pagination__end-item');
    }

    _createPlugin() {
      const that = this;

      config.callback = (data) => {
        that.$startItem.text(data[0]);
        that.$endItem.text(data[data.length - 1]);
      };

      this.$plugin.pagination(config);
    }
  }

  $('.js-pagination').each((i, node) => {
    new Pagination($(node));
  });
});
