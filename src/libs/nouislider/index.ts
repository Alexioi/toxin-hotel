import noUiSlider from 'nouislider';

type Parameters = {
  min: number;
  max: number;
  from: number;
  to: number;
};

class NoUISlider {
  private root: Element | null;

  private valueNode: Element | null;

  constructor(
    node: Element | null,
    valueNode: Element | null,
    parameters: Parameters,
  ) {
    this.root = node;
    this.valueNode = valueNode;

    this.updateValue = this.updateValue.bind(this);

    this.init(parameters);
  }

  private init(parameters: Parameters) {
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

    if (this.root instanceof HTMLElement) {
      noUiSlider.create(this.root, config);
    }

    // @ts-ignore
    this.root.noUiSlider.on('update', this.updateValue);
  }

  private updateValue([from, to]: number[]) {
    if (this.valueNode !== null) {
      this.valueNode.innerHTML = `${Number(from).toLocaleString()}₽ - ${Number(
        to,
      ).toLocaleString()}₽`;
    }
  }
}

export default NoUISlider;
