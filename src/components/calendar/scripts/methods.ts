import { Date as customDate } from '@components/text-field/scripts/types';

const calculateFullDate = (date: Date): customDate => {
  let day = String(date.getDate());
  let month = String(Number(date.getMonth()) + 1);
  const year = String(date.getFullYear());
  if (day.length !== 2) {
    day = `0${day}`;
  }
  if (month.length !== 2) {
    month = `0${month}`;
  }
  return { day, month, year };
};

export default calculateFullDate;
