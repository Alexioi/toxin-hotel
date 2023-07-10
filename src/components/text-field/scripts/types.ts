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

type ModelEvents = { UpdateDates: { dates: Dates } };

type ViewEvents = {
  InputData: { data: string };
  TouchInput: null;
  DeleteData: null;
  BlurInput: null;
};

export { MaskedType, CustomDate, Dates, Data, ModelEvents, ViewEvents };
