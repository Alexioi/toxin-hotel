import noUiSlider, { API } from 'nouislider';

import { config } from './config';

type Parameters = {
  min: number;
  max: number;
  from: number;
  to: number;
};

interface TargetElement extends HTMLElement {
  noUiSlider: API;
}

const isTargetElement = (element: HTMLElement): element is TargetElement => {
  return 'noUiSlider' in element;
};

class NoUISlider {
  private dom: {
    value: Element | null;
  };

  constructor(
    root: Element | null,
    valueNode: Element | null,
    parameters: Parameters,
  ) {
    this.dom = { value: valueNode };

    this.updateValue = this.updateValue.bind(this);

    this.init(root, parameters);
  }

  private init(root: Element | null, parameters: Parameters) {
    if (!(root instanceof HTMLElement)) {
      return;
    }

    const { min, max, from, to } = parameters;

    noUiSlider.create(root, {
      ...config,
      start: [from, to],
      range: {
        min,
        max,
      },
    });

    if (!isTargetElement(root)) {
      return;
    }

    root?.noUiSlider.on('update', this.updateValue);
  }

  private updateValue([from, to]: (string | number)[]) {
    if (this.dom.value === null) {
      return this;
    }

    this.dom.value.innerHTML = `${Math.trunc(Number(from))}₽ - ${Math.trunc(
      Number(to),
    )}₽`;

    return this;
  }
}

export { NoUISlider };
