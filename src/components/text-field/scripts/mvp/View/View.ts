import EventEmitter from '@helpers/EventEmitter';

import { Date } from '../../types';

const isNumber = (key: string | null): boolean => {
  if (key === null) {
    return false;
  }

  return /^\d$/.test(key);
};

const calculateDayAndMount = (checkedDate: Date) => {
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
};

class View {
  private root: HTMLInputElement;

  private eventEmitter: EventEmitter;

  private isFocus = false;

  constructor(root: HTMLInputElement, eventEmitter: EventEmitter) {
    this.root = root;
    this.eventEmitter = eventEmitter;

    this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    this.handleTextFieldPaste = this.handleTextFieldPaste.bind(this);
    this.handleTextFieldBlur = this.handleTextFieldBlur.bind(this);
    this.handleTextFieldClick = this.handleTextFieldClick.bind(this);

    this.init();
  }

  public displayDate(dates: Date[]): void {
    if (dates.length === 2 && !this.isFocus) {
      const [from, to] = dates;

      if (from.day === '') {
        this.root.value = '';
        return;
      }

      const maskedFrom = calculateDayAndMount(from);
      const maskedTo = calculateDayAndMount(to);

      this.root.value = `${maskedFrom} - ${maskedTo}`;
      return;
    }

    const [date] = dates;

    if (!this.isFocus && date.day === '') {
      this.root.value = '';
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const maskedDates = dates.map((date): string => {
      const { day, month, year } = date;

      const maskedDay = `${day}__`.slice(0, 2);
      const maskedMonth = `${month}__`.slice(0, 2);
      const maskedYear = `${year}____`.slice(0, 4);

      return `${maskedDay}.${maskedMonth}.${maskedYear}`;
    });

    const maskedDate = maskedDates.join('-');

    this.root.value = maskedDate;

    this.changeCaretPosition(maskedDate);
  }

  private changeCaretPosition(value: string): void {
    const cursorPosition = value.indexOf('_');

    this.root.setSelectionRange(cursorPosition, cursorPosition);
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
    this.isFocus = false;

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
    this.isFocus = true;
    this.eventEmitter.emit({
      eventName: 'TouchInput',
      eventArguments: null,
    });
  }

  private handleTextFieldInput = (event: Event) => {
    if (event instanceof InputEvent) {
      event.preventDefault();

      const { data } = event;

      if (event.inputType === 'deleteContentBackward') {
        this.eventEmitter.emit({
          eventName: 'DeleteData',
          eventArguments: null,
        });
        return;
      }

      if (!isNumber(data)) {
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
    }
  };
}

export default View;
