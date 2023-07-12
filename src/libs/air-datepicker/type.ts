type DatepickerData = {
  selectedDates: Date[];
  selectDate(date: Date): void;
  clear(): void;
};

type Options = {
  range: boolean;
  navTitles: {
    days: string;
  };
  prevHtml: string;
  nextHtml: string;
  minDate: Date;
};

interface JQueryWithAirDatepicker extends JQuery<Element> {
  datepicker(airDatepickerOptions: Options): this;
}

export { DatepickerData, JQueryWithAirDatepicker };
