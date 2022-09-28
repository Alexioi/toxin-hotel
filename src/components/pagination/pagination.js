import 'paginationjs';

$(() => {
  const cssSelectors = {
    plugin: '.js-pagination__plugin',
    startItem: '.js-pagination__start-item',
    endItem: '.js-pagination__end-item',
    pagination: '.js-pagination',
  };

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
      this.$plugin = this.$component.find(cssSelectors.plugin);
      this.$startItem = this.$component.find(cssSelectors.startItem);
      this.$endItem = this.$component.find(cssSelectors.endItem);
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

  $(cssSelectors.pagination).each((i, node) => {
    new Pagination($(node));
  });
});
