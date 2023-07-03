type MaskedType = 'none' | 'date' | 'dates';

type CustomDate = {
  day: string;
  month: string;
  year: string;
};

type Dates = CustomDate[];

type Data = {
  dates: Dates;
};

export { CustomDate, MaskedType, Dates, Data };
