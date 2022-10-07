import 'ion-rangeslider';

class IonRangeSlider {
  constructor($node, $valueNode, parameters) {
    this.$node = $node;
    this.$valueNode = $valueNode;
    this.parameters = parameters;

    this._init();
  }

  _init() {
    const config = {
      type: 'double',
      ...this.parameters,
      hide_min_max: true,
      hide_from_to: true,
      onStart: (data) => {
        this._updateValue(data);
      },
      onChange: (data) => {
        this._updateValue(data);
      },
    };

    this.$node.ionRangeSlider(config);
  }

  _updateValue({ from, to }) {
    this.$valueNode.text(`${from.toLocaleString()}₽ - ${to.toLocaleString()}₽`);
  }
}

export default IonRangeSlider;
