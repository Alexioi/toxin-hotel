import { EventEmitter } from '@helpers/EventEmitter';
import { helpers } from '@helpers';

import { CustomDate, ViewEvents } from '../../types';
import { displayDate } from './methods';

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
      this.emit('deleteData', null);
      return;
    }

    if (!helpers.isNumber(data)) {
      this.emit('touchInput', null);
      return;
    }

    this.emit('inputData', { data: String(data) });
  };

  private handleTextFieldPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const inputData = event.clipboardData?.getData('text');

    if (typeof inputData !== 'undefined') {
      this.emit('inputData', { data: inputData });
    }
  };

  private handleTextFieldBlur() {
    this.props = { isFocused: false };

    this.emit('blurInput', null);
  }

  private handleTextFieldClick() {
    this.props = { isFocused: true };
    this.emit('touchInput', null);
  }
}

export { View };
