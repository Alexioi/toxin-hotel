import { date } from '../../types';

const isValidDate = (checkedDate: date, key: number): boolean => {
  const { day, month, year } = checkedDate;

  const newDay = Number(day);
  const newMonth = Number(month);
  const newYear = Number(`${year}${key}`);

  const currentDate = new Date(newYear, newMonth, newDay);

  const dateYear = currentDate.getFullYear();
  const dateMonth = currentDate.getMonth();
  const dateDay = currentDate.getDate();

  return dateYear === newYear && dateMonth === newMonth && dateDay === newDay;
};

const calculateDay = (date: date, key: number): date => {
  const { day, month, year } = date;

  if (day.length === 2) {
    return calculateMonth(date, key);
  }

  if (day.length === 1) {
    if (day[0] === '0' && key === 0) {
      const newDay = `${day}1`;

      return { day: newDay, month, year };
    }

    if (day[0] === '3' && key > 0) {
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

const calculateMonth = (date: date, key: number): date => {
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

  if (month[0] === '0' && key === 0) {
    const newMonth = `${key}1`;

    return { day, month: newMonth, year };
  }

  if (month[0] === '1' && key > 2) {
    const newMonth = `${key}2`;

    return { day, month: newMonth, year };
  }

  const newMonth = `${month}${key}`;

  return { day, month: newMonth, year };
};

const calculateYear = (date: date, key: number): date => {
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

export { calculateDay };
