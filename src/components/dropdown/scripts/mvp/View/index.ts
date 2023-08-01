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
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
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
    this.subViews.counters.forEach((el) => {
      el.subscribe(eventName, callback);
    });
  }

  private init(node: Element) {
    const dom = initNodes(node);

    this.attachEventHandlers(dom);

    const counters = createCounters(node);
    const props = initProps(dom);

    toggleInputFocus(dom.input, props.isOpened);

    return { dom, subViews: { counters }, props };
  }

  private attachEventHandlers({ applyButton, clearButton, textField }: Dom) {
    applyButton?.addEventListener('click', this.handleApplyButtonClick);
    clearButton?.addEventListener('click', this.handleClearButtonClick);
    textField.addEventListener('click', this.handleToggleMenu);
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

  private handleToggleMenu() {
    const { root, input } = this.dom;
    const { isAutoUpdateInput, isUpdateButtonPressed, isOpened } = this.props;

    const newIsOpened = toggleMenu(root, input, isOpened);

    this.props = {
      isAutoUpdateInput,
      isUpdateButtonPressed,
      isOpened: newIsOpened,
    };

    return this;
  }

  private handleDocumentClick(event: Event) {
    const { root, menu, input, inputButton } = this.dom;
    const elements = [menu, input, inputButton];

    if (helpers.isElementsIncludeNode(event, elements)) {
      return;
    }

    const { isAutoUpdateInput, isUpdateButtonPressed } = this.props;

    const newIsOpened = closeMenu(root, input);

    this.props = {
      isAutoUpdateInput,
      isUpdateButtonPressed,
      isOpened: newIsOpened,
    };
  }
}

export { View };
