import $ from 'jquery';
import 'air-datepicker';

import arrow from '!raw-loader!@images/decorative/arrow.svg';

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

const isElementWithAirDatepicker = (
  element: JQuery<Element>,
): element is JQueryWithAirDatepicker => {
  return 'datepicker' in element;
};

class AirDatepicker {
  private root: Element;

  private datepickerData: DatepickerData | null = null;

  constructor(root: Element) {
    this.root = root;

    this.init();
  }

  public getSelectedDates() {
    if (this.datepickerData === null) {
      return { datepickerFrom: undefined, datepickerTo: undefined };
    }

    const [datepickerFrom, datepickerTo] = this.datepickerData.selectedDates;

    return { datepickerFrom, datepickerTo };
  }

  public changeDate(date: string) {
    this.datepickerData?.selectDate(new Date(date));

    return this;
  }

  public clearDates() {
    this.datepickerData?.clear();

    return this;
  }

  private init() {
    this.initAirDatepicker();

    return this;
  }

  private initAirDatepicker() {
    const airDatepickerOptions = {
      range: true,
      navTitles: { days: 'MM yyyy' },
      prevHtml: `<svg class="datepicker__icon datepicker__icon_back">${arrow}</svg>`,
      nextHtml: `<svg class="datepicker__icon">${arrow}</svg>`,
      minDate: new Date(),
    };

    const $root = $(this.root);

    if (isElementWithAirDatepicker($root)) {
      this.datepickerData = $root
        .datepicker(airDatepickerOptions)
        .data().datepicker;
    }

    return this;
  }
}

export { AirDatepicker, JQueryWithAirDatepicker };
