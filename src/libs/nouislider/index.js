import noUiSlider from 'nouislider';

class NoUISlider {
  constructor($node, $valueNode, parameters) {
    this.$node = $node;
    this.$valueNode = $valueNode;
    this.parameters = parameters;

    this._init();
  }

  _init() {
    const { min, max, from, to } = this.parameters;

    const config = {
      start: [from, to],
      connect: true,
      step: 100,
      range: {
        min,
        max,
      },
    };

    noUiSlider.create(this.$node[0], config);

    this.$node[0].noUiSlider.on('update', this._updateValue.bind(this));
  }

  _updateValue([from, to]) {
    this.$valueNode.text(`${Number(from).toLocaleString()}₽ - ${Number(to).toLocaleString()}₽`);
  }
}

export default NoUISlider;
