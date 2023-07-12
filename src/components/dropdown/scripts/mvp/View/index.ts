import { EventEmitter, Callback } from '@helpers/EventEmitter';
import { helpers } from '@helpers';

import { CounterEvents, ViewEvents } from '../../types';
import {
  toggleInputFocus,
  toggleClearButton,
  closeMenu,
  toggleMenu,
  createCounters,
  updateCounters,
  initNodes,
  initProps,
} from './methods';
import { Dom, Props, SubView } from './type';

class View extends EventEmitter<ViewEvents> {
  private dom: Dom;

  private subViews: SubView;

  private props: Props;

  constructor(node: Element) {
    super();

    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    const { dom, subViews, props } = this.init(node);

    this.dom = dom;
    this.props = props;
    this.subViews = subViews;
  }

  public update(counterValues: number[], value: string) {
    updateCounters(this.subViews.counters, counterValues);

    toggleClearButton(this.dom.clearButton, counterValues);

    if (this.props.isAutoUpdateInput || this.props.isUpdateButtonPressed) {
      this.props.isUpdateButtonPressed = false;
      this.updateInputValue(value);
    }
  }

  public updateInputValue(value: string) {
    if (!(this.dom.input instanceof HTMLInputElement)) {
      return;
    }

    this.dom.input.value = value;
  }

  public subscribeCountersToEvents<K extends keyof CounterEvents>(
    eventName: K,
    callback: Callback<CounterEvents, K>,
  ) {
    this.subViews.counters.forEach((counter) => {
      counter.subscribe(eventName, callback);
    });
  }

  private init(node: Element) {
    const dom = initNodes(node);

    this.attachEventHandlers(dom);

    const counters = createCounters(node);
    const props = initProps(dom);

    toggleInputFocus(node, dom.input);

    return { dom, subViews: { counters }, props };
  }

  private attachEventHandlers(dom: Dom) {
    const { applyButton, clearButton, textField } = dom;
    applyButton?.addEventListener('click', this.handleApplyButtonClick);
    clearButton?.addEventListener('click', this.handleClearButtonClick);
    textField?.addEventListener('click', this.toggleMenu);
    document.addEventListener('click', this.handleDocumentClick);

    return this;
  }

  private handleApplyButtonClick() {
    this.props.isUpdateButtonPressed = true;

    this.emit('ApplyDropdownData', null);
  }

  private handleClearButtonClick() {
    this.emit('ClearCounters', null);
  }

  private toggleMenu() {
    const { root, input } = this.dom;

    toggleMenu(root, input);

    return this;
  }

  private handleDocumentClick(event: Event) {
    const { menu, input, inputButton } = this.dom;
    const elements = [menu, input, inputButton];

    if (helpers.isElementsIncludeNode(event, elements)) {
      return;
    }

    closeMenu(this.dom.root, this.dom.input);
  }
}

export { View };
