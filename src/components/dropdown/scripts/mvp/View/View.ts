import EventEmitter from 'src/helpers/EventEmitter';
import cssSelectors from '../../constants';
import Counter from './subViews/Counter';

class View {
  private root: Element;

  private eventEmitter: EventEmitter;

  private input: Element | null = null;

  private inputButton: Element | null = null;

  private textField: Element | null = null;

  private counters: Counter[] = [];

  private clearButton: Element | null = null;

  private applyButton: Element | null = null;

  private menu: Element | null = null;

  constructor(node: Element, eventEmitter: EventEmitter) {
    this.root = node;
    this.eventEmitter = eventEmitter;

    this.init();
  }

  public update(counters: number[], value: string) {
    this.counters.forEach((counter, index) => {
      counter.update(counters[index]);
    });

    if (this.input instanceof HTMLInputElement) {
      this.input.value = value;
    }
  }

  private init() {
    this.findAndInitNodes().initCounters();
  }

  private findAndInitNodes() {
    this.input = this.root.querySelector(cssSelectors.input);
    this.inputButton = this.root.querySelector(cssSelectors.inputButton);
    this.textField = this.root.querySelector(cssSelectors.textField);
    this.clearButton = this.root.querySelector(cssSelectors.clearButton);
    this.applyButton = this.root.querySelector(cssSelectors.applyButton);
    this.menu = this.root.querySelector(cssSelectors.menu);

    return this;
  }

  private attachEventHandlers() {
    return this;
  }

  private initCounters() {
    const counters = this.root.querySelectorAll(cssSelectors.items);

    counters.forEach((counterNode, index) => {
      const counter = new Counter(counterNode, this.eventEmitter, index);

      this.counters.push(counter);
    });
  }
}

export default View;
