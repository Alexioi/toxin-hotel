import EventEmitter from '../../../../helpers/EventEmitter';

import { date } from '../../types';

class View {
  private node: HTMLInputElement;

  private eventEmitter: EventEmitter;

  private isFocus = false;

  constructor(node: HTMLInputElement, eventEmitter: EventEmitter) {
    this.node = node;
    this.eventEmitter = eventEmitter;

    this.init();
  }

  public displayDate(dates: date[]): void {
    if (dates.length === 2 && !this.isFocus) {
      const [from, to] = dates;

      if (from.day === '') {
        this.node.value = '';
        return;
      }

      const maskedFrom = this.calculateDayAndMount(from);
      const maskedTo = this.calculateDayAndMount(to);

      this.node.value = `${maskedFrom} - ${maskedTo}`;
      return;
    }

    const [date] = dates;

    if (!this.isFocus && date.day === '') {
      this.node.value = '';
      return;
    }

    const maskedDates = dates.map((date): string => {
      const { day, month, year } = date;

      const maskedDay = `${day}__`.slice(0, 2);
      const maskedMonth = `${month}__`.slice(0, 2);
      const maskedYear = `${year}____`.slice(0, 4);

      return `${maskedDay}.${maskedMonth}.${maskedYear}`;
    });

    const maskedDate = maskedDates.join('-');

    this.node.value = maskedDate;

    this.changeCaretPosition(maskedDate);
  }

  calculateDayAndMount(checkedDate: date) {
    const { day, month, year } = checkedDate;

    const monthNames = [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек',
    ];

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const monthNumber = date.getMonth();

    const monthName = monthNames[monthNumber];

    return `${day} ${monthName}`;
  }

  private changeCaretPosition(value: string): void {
    const cursorPosition = value.indexOf('_');

    this.node.setSelectionRange(cursorPosition, cursorPosition);
  }

  private init() {
    this.attachEventsHandler();
  }

  private attachEventsHandler() {
    // @ts-ignore
    this.node.addEventListener('input', this.onInput);
    this.node.addEventListener('paste', this.onPaste);
    this.node.addEventListener('blur', this._onBlur.bind(this));
    this.node.addEventListener('click', this.onClick.bind(this));
  }

  _onBlur() {
    this.isFocus = false;

    this.eventEmitter.emit({
      eventName: 'BlurInput',
      eventArguments: null,
    });
  }

  private onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const inputData = event.clipboardData?.getData('text');

    if (typeof inputData !== 'undefined') {
      this.eventEmitter.emit({
        eventName: 'InputData',
        eventArguments: inputData,
      });
    }
  };

  private onClick() {
    this.isFocus = true;
    this.eventEmitter.emit({
      eventName: 'TouchInput',
      eventArguments: null,
    });
  }

  private onInput = (event: InputEvent) => {
    event.preventDefault();

    const data = event.data;

    if (event.inputType === 'deleteContentBackward') {
      this.eventEmitter.emit({
        eventName: 'DeleteData',
        eventArguments: null,
      });
      return;
    }

    if (!this.isNumber(data)) {
      this.eventEmitter.emit({
        eventName: 'TouchInput',
        eventArguments: null,
      });
      return;
    }

    this.eventEmitter.emit({
      eventName: 'InputData',
      eventArguments: String(data),
    });
  };

  private isNumber(key: string | null): boolean {
    if (key === null) {
      return false;
    }

    return /^\d$/.test(key);
  }
}

export default View;
