import { EventEmitter } from '@helpers/EventEmitter';

import { CustomDate, ViewEvents } from '../../types';
import { displayDate, isNumber } from './methods';

class View extends EventEmitter<ViewEvents> {
  private dom: { root: HTMLInputElement };

  private props: { isFocused: boolean };

  constructor(node: HTMLInputElement) {
    super();

    this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    this.handleTextFieldPaste = this.handleTextFieldPaste.bind(this);
    this.handleTextFieldBlur = this.handleTextFieldBlur.bind(this);
    this.handleTextFieldClick = this.handleTextFieldClick.bind(this);

    const { dom, props } = this.init(node);

    this.dom = dom;
    this.props = props;
  }

  public displayDate(dates: CustomDate[]): void {
    displayDate(dates, this.props.isFocused, this.dom.root);
  }

  private init(root: HTMLInputElement) {
    const dom = { root };
    const props = { isFocused: false };

    this.attachEventsHandler(dom);

    return { dom, props };
  }

  private attachEventsHandler(dom: { root: HTMLInputElement }) {
    const { root } = dom;

    root.addEventListener('input', this.handleTextFieldInput);
    root.addEventListener('paste', this.handleTextFieldPaste);
    root.addEventListener('blur', this.handleTextFieldBlur);
    root.addEventListener('click', this.handleTextFieldClick);

    return this;
  }

  private handleTextFieldInput = (event: Event) => {
    event.preventDefault();

    if (!(event instanceof InputEvent)) {
      return;
    }

    const { data } = event;

    if (event.inputType === 'deleteContentBackward') {
      this.emit('DeleteData', null);
      return;
    }

    if (!isNumber(data)) {
      this.emit('TouchInput', null);
      return;
    }

    this.emit('InputData', { data: String(data) });
  };

  private handleTextFieldPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const inputData = event.clipboardData?.getData('text');

    if (typeof inputData !== 'undefined') {
      this.emit('InputData', { data: inputData });
    }
  };

  private handleTextFieldBlur() {
    this.props = { isFocused: false };

    this.emit('BlurInput', null);
  }

  private handleTextFieldClick() {
    this.props = { isFocused: true };
    this.emit('TouchInput', null);
  }
}

export { View };
