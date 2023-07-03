import { Dates, MaskedType, CustomDate } from '../../types';

const isValidDate = (checkedDate: CustomDate, key: number): boolean => {
  const { day, month, year } = checkedDate;

  const newDay = Number(day);
  const newMonth = Number(month);
  const newYear = Number(`${year}${key}`);

  const currentDate = new Date(newYear, newMonth, newDay);

  if (currentDate < new Date()) {
    return false;
  }

  const dateYear = currentDate.getFullYear();
  const dateMonth = currentDate.getMonth();
  const dateDay = currentDate.getDate();

  return dateYear === newYear && dateMonth === newMonth && dateDay === newDay;
};

const calculateYear = (date: CustomDate, key: number): CustomDate => {
  const { day, month, year } = date;

  if (year === '') {
    const newYear = `${key}`;

    return { day, month, year: newYear };
  }

  if (year.length === 4) {
    return date;
  }

  if (year.length === 3) {
    if (isValidDate(date, key)) {
      return { day, month, year: `${year}${key}` };
    }

    return date;
  }

  const newYear = `${year}${key}`;

  return { day, month, year: newYear };
};

const calculateMonth = (date: CustomDate, key: number): CustomDate => {
  const { day, month, year } = date;

  if (month === '') {
    if (Number(day) > 29 && key === 2) {
      return { day, month, year };
    }

    if (key > 1) {
      const newMonth = `0${key}`;

      return { day, month: newMonth, year };
    }

    const newMonth = `${key}`;

    return { day, month: newMonth, year };
  }

  if (month.length === 2) {
    return calculateYear(date, key);
  }

  if (Number(day) > 29 && key === 2) {
    return { day, month, year };
  }

  if (month === '0' && key === 0) {
    const newMonth = `${key}1`;

    return { day, month: newMonth, year };
  }

  if (month === '1' && key > 2) {
    const newMonth = `${key}2`;

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
      const newDay = `${day}1`;

      return { day: newDay, month, year };
    }

    if (day === '3' && key > 0) {
      const newDay = `${day}1`;

      return { day: newDay, month, year };
    }

    const newDay = day + String(key);
    return { day: newDay, month, year };
  }

  if (key > 3) {
    const newDay = `${day}0${key}`;

    return { day: newDay, month, year };
  }

  const newDay = day + String(key);
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

const isNumber = (key: string | null): boolean => {
  if (key === null) {
    return false;
  }

  return /^\d$/.test(key);
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

export { isNumber, deleteIncompleteDate, removeDate, updateDates };
