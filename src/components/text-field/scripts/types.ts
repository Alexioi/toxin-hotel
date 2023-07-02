type MaskedType = 'none' | 'date' | 'dates';

type customDate = {
  day: string;
  month: string;
  year: string;
};

type Dates = customDate[];

type Data = {
  dates: Dates;
};

export { customDate, MaskedType, Dates, Data };
