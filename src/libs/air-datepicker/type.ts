interface DatepickerData {
  selectedDates: Date[];
  selectDate(date: Date): void;
  clear(): void;
}

interface AirDatepickerOptions {
  range: boolean;
  navTitles: {
    days: string;
  };
  prevHtml: string;
  nextHtml: string;
  minDate: Date;
}

interface JQueryWithAirDatepicker extends JQuery<Element> {
  datepicker(airDatepickerOptions: AirDatepickerOptions): this;
}

export { DatepickerData, JQueryWithAirDatepicker };
