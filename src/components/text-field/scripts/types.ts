import { EventEmitter } from '@helpers/EventEmitter';

type MaskedType = 'none' | 'date' | 'dates';

type CustomDate = {
  day: string;
  month: string;
  year: string;
};

type Dates = CustomDate[];

type TextFieldEventEmitter = EventEmitter<{
  UpdateDates: { dates: Dates };
  InputData: { data: string };
  TouchInput: null;
  DeleteData: null;
  BlurInput: null;
}>;

type Data = {
  dates: Dates;
};

export { CustomDate, MaskedType, Dates, TextFieldEventEmitter, Data };
