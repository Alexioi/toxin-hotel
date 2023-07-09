import { CustomDate, TextFieldEventEmitter } from '../../types';

const isNumber = (key: string | null): boolean => {
  if (key === null) {
    return false;
  }

  return /^\d$/.test(key);
};

const calculateDayAndMonth = (checkedDate: CustomDate) => {
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
  dates: CustomDate[],
  isFocused: boolean,
  node: HTMLInputElement,
) => {
  const input = node;

  if (dates.length === 2 && !isFocused) {
    const [from, to] = dates;

    if (from.day === '') {
      input.value = '';
      return;
    }

    const maskedFrom = calculateDayAndMonth(from);
    const maskedTo = calculateDayAndMonth(to);

    input.value = `${maskedFrom} - ${maskedTo}`;
    return;
  }

  const [date] = dates;

  if (!isFocused && date.day === '') {
    input.value = '';
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

  input.value = maskedDate;

  changeCaretPosition(node, maskedDate);
};

const emitInputData = (event: Event, eventEmitter: TextFieldEventEmitter) => {
  if (event instanceof InputEvent) {
    event.preventDefault();

    const { data } = event;

    if (event.inputType === 'deleteContentBackward') {
      eventEmitter.emit('DeleteData', null);
      return;
    }

    if (!isNumber(data)) {
      eventEmitter.emit('TouchInput', null);
      return;
    }

    eventEmitter.emit('InputData', { data: String(data) });
  }
};

export { displayDate, emitInputData };
