import noUiSlider, { API } from 'nouislider';

type Parameters = {
  min: number;
  max: number;
  from: number;
  to: number;
};

interface TargetElement extends HTMLElement {
  noUiSlider: API;
}

class NoUISlider {
  private root: TargetElement | null;

  private valueNode: Element | null;

  constructor(
    root: Element | null,
    valueNode: Element | null,
    parameters: Parameters,
  ) {
    this.root = root as TargetElement;
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

    if (this.root instanceof Element) {
      noUiSlider.create(this.root, config);
    }

    this.root?.noUiSlider.on('update', this.updateValue);

    return this;
  }

  private updateValue([from, to]: (string | number)[]) {
    if (this.valueNode !== null) {
      this.valueNode.innerHTML = `${from.toLocaleString()}₽ - ${to.toLocaleString()}₽`;
    }

    return this;
  }
}

export default NoUISlider;
