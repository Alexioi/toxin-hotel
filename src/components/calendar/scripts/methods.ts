import { Date as customDate } from '@components/text-field/scripts/types';

const getDateToString = (date: number): string => {
  if (String(date).length !== 2) {
    return `0${date}`;
  }

  return String(date);
};

const calculateFullDate = (date: Date): customDate => {
  const day = getDateToString(date.getDate());
  const month = getDateToString(date.getMonth() + 1);
  const year = String(date.getFullYear());

  return { day, month, year };
};

export default calculateFullDate;
