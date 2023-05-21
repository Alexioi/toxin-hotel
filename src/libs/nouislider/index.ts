import noUiSlider from 'nouislider';

type parameters = {
  min: number;
  max: number;
  from: number;
  to: number;
};

class NoUISlider {
  private node: HTMLElement;

  private valueNode: HTMLElement;

  constructor(
    node: HTMLElement,
    valueNode: HTMLElement,
    parameters: parameters,
  ) {
    this.node = node;
    this.valueNode = valueNode;

    this.init(parameters);
  }

  private init(parameters: parameters) {
    const { min, max, from, to } = parameters;

    const config = {
      start: [from, to],
      connect: true,
      step: 100,
      range: {
        min,
        max,
      },
    };

    noUiSlider.create(this.node, config);

    // @ts-ignore
    this.node.noUiSlider.on('update', this.updateValue.bind(this));
  }

  private updateValue([from, to]: number[]) {
    this.valueNode.innerHTML = `${Number(from).toLocaleString()}₽ - ${Number(
      to,
    ).toLocaleString()}₽`;
  }
}

export default NoUISlider;
