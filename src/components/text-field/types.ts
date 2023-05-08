type maskedType = 'text' | 'date' | 'dates';

type date = {
  day: string;
  month: string;
  year: string;
};

type dates = date[];

type data = {
  dates: dates;
  text: string;
};

export { date, maskedType, dates, data };
