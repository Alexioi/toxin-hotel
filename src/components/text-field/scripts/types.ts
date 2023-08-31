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

type ModelEvents = { updateDates: { dates: Dates } };

type ViewEvents = {
  inputData: { data: string };
  touchInput: null;
  deleteData: null;
  blurInput: null;
};

export { MaskedType, CustomDate, Dates, Data, ModelEvents, ViewEvents };
