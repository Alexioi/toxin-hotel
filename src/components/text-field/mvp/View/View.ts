import EventEmitter from '../../../../helpers/EventEmitter';

import { dates } from '../../types';

class View {
  private node: HTMLInputElement;

  private eventEmitter: EventEmitter;

  constructor(node: HTMLInputElement, eventEmitter: EventEmitter) {
    this.node = node;
    this.eventEmitter = eventEmitter;

    this.init();
  }

  public displayDate({ dates }: { dates: dates }): void {
    console.log(dates);
    const maskedDates = dates.map((date): string => {
      const { day, month, year } = date;

      const maskedDay = `${day}__`.slice(0, 2);
      const maskedMonth = `${month}__`.slice(0, 2);
      const maskedYear = `${year}____`.slice(0, 4);

      return `${maskedDay}.${maskedMonth}.${maskedYear}`;
    });

    this.node.value = maskedDates.join('-');
  }

  private init() {
    this.attachEventsHandler();
  }

  private attachEventsHandler() {
    // @ts-ignore
    this.node.addEventListener('input', this.onInput);
  }

  private onInput = (event: InputEvent) => {
    event.preventDefault();

    const data = event.data;

    console.log(event.inputType);

    if (event.inputType === 'deleteContentBackward') {
      console.log('2');
      this.eventEmitter.emit({
        eventName: 'DeleteData',
        eventArguments: null,
      });
      return;
    }

    if (!View._isNumber(data)) {
      this.eventEmitter.emit({
        eventName: 'TouchInput',
        eventArguments: null,
      });
      return;
    }

    this.eventEmitter.emit({
      eventName: 'InputData',
      eventArguments: Number(data),
    });
  };

  static _isNumber(key: string | null): boolean {
    if (key === null) {
      return false;
    }

    return /^\d$/.test(key);
  }
}

export default View;
