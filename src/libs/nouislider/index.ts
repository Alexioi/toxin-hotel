import noUiSlider from 'nouislider';

type Parameters = {
  min: number;
  max: number;
  from: number;
  to: number;
};

interface Config {
  start: number[];
  connect: boolean;
  step: number;
  range: {
    min: number;
    max: number;
  };
}

interface ElementWithNoUiSlider extends Element {
  noUiSlider: {
    on: (method: 'update', data: ([from, to]: number[]) => void) => void;
    create: (element: HTMLElement, config: Config) => void;
    destroy: () => void;
    steps: () => any;
    off: () => void;
    get: () => void;
    set: () => void;
    setHandle: () => void;
    reset: () => void;
    options: () => void;
    updateOptions: () => void;
    target: () => void;
    removePips: () => void;
    removeTooltips: () => void;
    getTooltips: () => void;
    getOrigins: () => void;
    pips: () => void;
  };
}

class NoUISlider {
  private root: ElementWithNoUiSlider | null;

  private valueNode: Element | null;

  constructor(
    root: Element | null,
    valueNode: Element | null,
    parameters: Parameters,
  ) {
    this.root = root as ElementWithNoUiSlider;
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
      // @ts-ignore
      noUiSlider.create(this.root, config);
    }

    this.root?.noUiSlider.on('update', this.updateValue);
  }

  private updateValue([from, to]: number[]) {
    if (this.valueNode !== null) {
      this.valueNode.innerHTML = `${from.toLocaleString()}₽ - ${to.toLocaleString()}₽`;
    }
  }
}

export default NoUISlider;
