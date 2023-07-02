import EventEmitter from '@helpers/EventEmitter';
import { customDate } from '../../types';

const isNumber = (key: string | null): boolean => {
  if (key === null) {
    return false;
  }

  return /^\d$/.test(key);
};

const calculateDayAndMount = (checkedDate: customDate) => {
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

const changeCaretPosition = (node: HTMLInputElement, value: string) => {
  const cursorPosition = value.indexOf('_');

  node.setSelectionRange(cursorPosition, cursorPosition);
};

const displayDate = (
  dates: customDate[],
  isFocus: boolean,
  node: HTMLInputElement,
) => {
  if (dates.length === 2 && !isFocus) {
    const [from, to] = dates;

    if (from.day === '') {
      node.value = '';
      return;
    }

    const maskedFrom = calculateDayAndMount(from);
    const maskedTo = calculateDayAndMount(to);

    node.value = `${maskedFrom} - ${maskedTo}`;
    return;
  }

  const [date] = dates;

  if (!isFocus && date.day === '') {
    node.value = '';
    return;
  }

  const maskedDates = dates.map((objectDate): string => {
    const { day, month, year } = objectDate;

    const maskedDay = `${day}__`.slice(0, 2);
    const maskedMonth = `${month}__`.slice(0, 2);
    const maskedYear = `${year}____`.slice(0, 4);

    return `${maskedDay}.${maskedMonth}.${maskedYear}`;
  });

  const maskedDate = maskedDates.join('-');

  node.value = maskedDate;

  changeCaretPosition(node, maskedDate);
};

const emitInputData = (event: Event, eventEmitter: EventEmitter) => {
  if (event instanceof InputEvent) {
    event.preventDefault();

    const { data } = event;

    if (event.inputType === 'deleteContentBackward') {
      eventEmitter.emit({
        eventName: 'DeleteData',
        eventArguments: null,
      });
      return;
    }

    if (!isNumber(data)) {
      eventEmitter.emit({
        eventName: 'TouchInput',
        eventArguments: null,
      });
      return;
    }

    eventEmitter.emit({
      eventName: 'InputData',
      eventArguments: String(data),
    });
  }
};

export { displayDate, emitInputData };
