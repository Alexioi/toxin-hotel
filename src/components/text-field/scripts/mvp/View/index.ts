import EventEmitter from '@helpers/EventEmitter';

import { CustomDate } from '../../types';
import { displayDate, emitInputData } from './methods';

class View {
  private root: HTMLInputElement;

  private eventEmitter: EventEmitter;

  private isFocused = false;

  constructor(root: HTMLInputElement, eventEmitter: EventEmitter) {
    this.root = root;
    this.eventEmitter = eventEmitter;

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
  }

  private attachEventsHandler() {
    this.root.addEventListener('input', this.handleTextFieldInput);
    this.root.addEventListener('paste', this.handleTextFieldPaste);
    this.root.addEventListener('blur', this.handleTextFieldBlur);
    this.root.addEventListener('click', this.handleTextFieldClick);
  }

  private handleTextFieldBlur() {
    this.isFocused = false;

    this.eventEmitter.emit({
      eventName: 'BlurInput',
      eventArguments: null,
    });
  }

  private handleTextFieldPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const inputData = event.clipboardData?.getData('text');

    if (typeof inputData !== 'undefined') {
      this.eventEmitter.emit({
        eventName: 'InputData',
        eventArguments: inputData,
      });
    }
  };

  private handleTextFieldClick() {
    this.isFocused = true;
    this.eventEmitter.emit({
      eventName: 'TouchInput',
      eventArguments: null,
    });
  }

  private handleTextFieldInput = (event: Event) => {
    emitInputData(event, this.eventEmitter);
  };
}

export default View;
