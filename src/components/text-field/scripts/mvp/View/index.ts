import { EventEmitter } from '@helpers/EventEmitter';

import { CustomDate, ViewEvents } from '../../types';
import { displayDate, isNumber } from './methods';

class View extends EventEmitter<ViewEvents> {
  private root: HTMLInputElement;

  private isFocused = false;

  constructor(root: HTMLInputElement) {
    super();

    this.root = root;

    this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    this.handleTextFieldPaste = this.handleTextFieldPaste.bind(this);
    this.handleTextFieldBlur = this.handleTextFieldBlur.bind(this);
    this.handleTextFieldClick = this.handleTextFieldClick.bind(this);

    this.init();
  }

  public displayDate(dates: CustomDate[]): void {
    displayDate(dates, this.isFocused, this.root);
  }

  private init() {
    this.attachEventsHandler();

    return this;
  }

  private attachEventsHandler() {
    this.root.addEventListener('input', this.handleTextFieldInput);
    this.root.addEventListener('paste', this.handleTextFieldPaste);
    this.root.addEventListener('blur', this.handleTextFieldBlur);
    this.root.addEventListener('click', this.handleTextFieldClick);

    return this;
  }

  private handleTextFieldBlur() {
    this.isFocused = false;

    this.emit('BlurInput', null);
  }

  private handleTextFieldPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const inputData = event.clipboardData?.getData('text');

    if (typeof inputData !== 'undefined') {
      this.emit('InputData', { data: inputData });
    }
  };

  private handleTextFieldClick() {
    this.isFocused = true;
    this.emit('TouchInput', null);
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
}

export { View };
