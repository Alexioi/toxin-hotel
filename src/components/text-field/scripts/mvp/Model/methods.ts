import { Dates, MaskedType, CustomDate } from '../../types';

const init = (type: MaskedType) => {
  const date = { day: '', month: '', year: '' };

  const dates = type === 'dates' ? [{ ...date }, { ...date }] : [{ ...date }];

  return { props: { type, dates } };
};

const isDateValid = (checkedDate: CustomDate, key: number): boolean => {
  const { day, month, year } = checkedDate;

  const date = `${year}${key},${month},${day}`;

  const currentDate = new Date(date);

  const isDayValid = Number(day) === currentDate.getDate();
  const isMonthValid = Number(month) === currentDate.getMonth() + 1;
  const isYearValid = Number(`${year}${key}`) === currentDate.getFullYear();

  return isYearValid && isMonthValid && isDayValid;
};

const calculateYear = (date: CustomDate, key: number): CustomDate => {
  const { day, month, year } = date;

  if (year.length < 3) {
    const newYear = `${year}${key}`;

    return { day, month, year: newYear };
  }

  if (year.length === 3 && isDateValid(date, key)) {
    return { day, month, year: `${year}${key}` };
  }

  return date;
};

const calculateMonth = (date: CustomDate, key: number): CustomDate => {
  const { day, month, year } = date;

  if (month.length === 2) {
    return calculateYear(date, key);
  }

  if (Number(day) > 29 && key === 2) {
    return { day, month, year };
  }

  if (month === '0' && key === 0) {
    return { day, month: '01', year };
  }

  if (month === '1' && key > 1) {
    return { day, month: '12', year };
  }

  if (key > 1) {
    const newMonth = `0${key}`;

    return { day, month: newMonth, year };
  }

  const newMonth = `${month}${key}`;

  return { day, month: newMonth, year };
};

const calculateDay = (date: CustomDate, key: number): CustomDate => {
  const { day, month, year } = date;

  if (day.length === 2) {
    return calculateMonth(date, key);
  }

  if (day.length === 1) {
    if (day === '0' && key === 0) {
      return { day: '01', month, year };
    }

    if (day === '3' && key > 0) {
      return { day: '31', month, year };
    }

    const newDay = `${day}${key}`;
    return { day: newDay, month, year };
  }

  if (key > 3) {
    const newDay = `0${key}`;

    return { day: newDay, month, year };
  }

  const newDay = `${day}${key}`;
  return { day: newDay, month, year };
};

const removeLastSymbol = (date: CustomDate): CustomDate => {
  const { day, month, year } = date;

  if (year.length > 0) {
    const newYear = year.slice(0, -1);

    return { day, month, year: newYear };
  }

  if (month.length > 0) {
    const newMonth = month.slice(0, -1);

    return { day, month: newMonth, year };
  }

  const newDay = day.slice(0, -1);

  return { day: newDay, month, year };
};

const deleteIncompleteDate = (type: MaskedType, dates: Dates): Dates => {
  if (type === 'date') {
    const [date] = dates;
    if (date.year.length !== 4) {
      return [{ day: '', month: '', year: '' }];
    }
  }

  if (type === 'dates') {
    const [, to] = dates;

    if (to.year.length !== 4) {
      return [
        { day: '', month: '', year: '' },
        { day: '', month: '', year: '' },
      ];
    }
  }

  return dates;
};

const removeDate = (type: MaskedType, dates: Dates): Dates => {
  if (type === 'date') {
    const [date] = dates;

    const newDate = removeLastSymbol(date);

    return [newDate];
  }

  if (type === 'dates') {
    const [from, to] = dates;

    if (to.day.length !== 0) {
      const newTo = removeLastSymbol(to);

      return [from, newTo];
    }

    const newFrom = removeLastSymbol(from);

    return [newFrom, to];
  }

  return dates;
};

const updateDates = (type: MaskedType, dates: Dates, data?: number): Dates => {
  if (data === null) {
    return dates;
  }

  const numberData = Number(data);

  if (type === 'date') {
    const [date] = dates;

    const newFrom = calculateDay(date, numberData);

    return [newFrom];
  }

  if (type === 'dates') {
    const [from, to] = dates;

    if (from.year.length !== 4) {
      const newFrom = calculateDay(from, numberData);

      return [newFrom, to];
    }

    const newTo = calculateDay(to, numberData);

    return [from, newTo];
  }

  return dates;
};

export { init, deleteIncompleteDate, removeDate, updateDates };
