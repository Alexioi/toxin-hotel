import EventEmitter from '@helpers/EventEmitter';

type MaskedType = 'none' | 'date' | 'dates';

type CustomDate = {
  day: string;
  month: string;
  year: string;
};

type Dates = CustomDate[];

type TextFieldEventEmitter = EventEmitter<{
  UpdateDates: Dates;
  InputData: string;
  TouchInput: null;
  DeleteData: null;
  BlurInput: null;
}>;

export { CustomDate, MaskedType, Dates, TextFieldEventEmitter };
