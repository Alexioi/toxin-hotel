import helpers from '@helpers/index';
import EventEmitter from '@helpers/EventEmitter';

import cssSelectors from '../../constants';
import Counter from './subViews/Counter';

const toggleClearButton = (clearButton: Element, countersValue: number[]) => {
  if (clearButton === null) {
    return;
  }

  const countersSum = countersValue.reduce((partialSum, counter) => {
    return partialSum + counter;
  }, 0);

  if (countersSum === 0) {
    clearButton.classList.add('dropdown__clear-button_hidden');
  } else {
    clearButton.classList.remove('dropdown__clear-button_hidden');
  }
};

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

  private isAutoUpdateInput = true;

  constructor(node: Element, eventEmitter: EventEmitter) {
    this.root = node;
    this.eventEmitter = eventEmitter;

    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onClickDocument = this.onClickDocument.bind(this);

    this.init();
  }

  public update(counters: number[], value: string) {
    this.counters.forEach((counter, index) => {
      counter.update(counters[index]);
    });

    if (this.clearButton !== null) {
      toggleClearButton(this.clearButton, counters);
    }

    if (this.isAutoUpdateInput) {
      this.updateInputValue(value);
    }
  }

  public updateInputValue(value: string) {
    if (this.input instanceof HTMLInputElement) {
      this.input.value = value;
    }
  }

  private init() {
    this.findAndInitNodes()
      .attachEventHandlers()
      .initCounters()
      .defineAutomaticInputDataModification()
      .toggleInputFocus();
  }

  private defineAutomaticInputDataModification() {
    if (this.applyButton !== null) {
      this.isAutoUpdateInput = false;
    }

    return this;
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
    this.applyButton?.addEventListener('click', this.handleApplyButtonClick);
    this.clearButton?.addEventListener('click', this.handleClearButtonClick);
    this.textField?.addEventListener('click', this.toggleMenu);
    document.addEventListener('click', this.onClickDocument);

    return this;
  }

  private handleClearButtonClick() {
    this.eventEmitter.emit({
      eventName: 'ClearCounters',
      eventArguments: null,
    });
  }

  private handleApplyButtonClick() {
    this.eventEmitter.emit({
      eventName: 'ApplyDropdownData',
      eventArguments: null,
    });
  }

  private initCounters() {
    const counters = this.root.querySelectorAll(cssSelectors.items);

    counters.forEach((counterNode, index) => {
      const counter = new Counter(counterNode, this.eventEmitter, index);

      this.counters.push(counter);
    });

    return this;
  }

  private onClickDocument(event: Event) {
    const elements = [this.menu, this.input, this.inputButton];
    if (!helpers.isElementsIncludeNode(event, elements)) {
      this.closeMenu();
    }
  }

  private closeMenu() {
    this.root.classList.remove('dropdown_opened');

    this.toggleInputFocus();
  }

  private toggleMenu() {
    this.root.classList.toggle('dropdown_opened');
    this.toggleInputFocus();
  }

  private toggleInputFocus() {
    const isOpened = this.root.classList.contains('dropdown_opened');

    if (isOpened) {
      this.input?.classList.add('text-field__input_opened');
    } else {
      this.input?.classList.remove('text-field__input_opened');
    }

    return this;
  }
}

export default View;
