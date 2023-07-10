import { EventEmitter, Callback } from '@helpers/EventEmitter';
import { helpers } from '@helpers/index';

import { cssSelectors } from '../../constants';
import { Counter } from './subViews/Counter';
import { CounterEvents, ViewEvents } from '../../types';
import {
  toggleInputFocus,
  toggleClearButton,
  closeMenu,
  toggleMenu,
  createCounters,
  updateCounters,
} from './methods';

class View extends EventEmitter<ViewEvents> {
  private root: Element;

  private input: Element | null = null;

  private inputButton: Element | null = null;

  private textField: Element | null = null;

  private counters: Counter[] = [];

  private clearButton: Element | null = null;

  private applyButton: Element | null = null;

  private menu: Element | null = null;

  private isAutoUpdateInput = true;

  private isUpdateButtonPressed = true;

  constructor(node: Element) {
    super();

    this.root = node;

    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.init();
  }

  public update(counterValues: number[], value: string) {
    updateCounters(this.counters, counterValues);

    toggleClearButton(this.clearButton, counterValues);

    if (this.isAutoUpdateInput || this.isUpdateButtonPressed) {
      this.isUpdateButtonPressed = false;
      this.updateInputValue(value);
    }
  }

  public updateInputValue(value: string) {
    if (this.input instanceof HTMLInputElement) {
      this.input.value = value;
    }
  }

  public subscribeCountersToEvents(
    eventName: keyof CounterEvents,
    callback: Callback<CounterEvents, keyof CounterEvents>,
  ) {
    this.counters.forEach((counter) => {
      counter.subscribe(eventName, callback);
    });
  }

  private init() {
    this.initNodes()
      .attachEventHandlers()
      .initCounters()
      .defineAutomaticInputDataModification();

    toggleInputFocus(this.root, this.input);

    return this;
  }

  private defineAutomaticInputDataModification() {
    if (this.applyButton !== null) {
      this.isAutoUpdateInput = false;
    }

    return this;
  }

  private initNodes() {
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
    document.addEventListener('click', this.handleDocumentClick);

    return this;
  }

  private handleClearButtonClick() {
    this.emit('ClearCounters', null);
  }

  private handleApplyButtonClick() {
    this.isUpdateButtonPressed = true;

    this.emit('ApplyDropdownData', null);
  }

  private initCounters() {
    this.counters = createCounters(this.root);

    return this;
  }

  private handleDocumentClick(event: Event) {
    const elements = [this.menu, this.input, this.inputButton];

    if (!helpers.isElementsIncludeNode(event, elements)) {
      closeMenu(this.root, this.input);
    }
  }

  private toggleMenu() {
    toggleMenu(this.root, this.input);

    return this;
  }
}

export { View };
