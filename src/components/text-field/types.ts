type MaskedType = 'none' | 'date' | 'dates';

type Date = {
  day: string;
  month: string;
  year: string;
};

type Dates = Date[];

type Data = {
  dates: Dates;
  text: string;
};

export { Date, MaskedType, Dates, Data };
