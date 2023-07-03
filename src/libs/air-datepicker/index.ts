import 'air-datepicker';

// @ts-ignore
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

interface JQueryWithAirDatepicker extends JQuery {
  datepicker(airDatepickerOptions: AirDatepickerOptions): this;
}

class AirDatepicker {
  private $root: JQueryWithAirDatepicker;

  private datepickerData: DatepickerData | null = null;

  constructor($root: JQueryWithAirDatepicker) {
    this.$root = $root;

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

    this.datepickerData = this.$root
      .datepicker(airDatepickerOptions)
      .data().datepicker;

    return this;
  }
}

export { AirDatepicker, JQueryWithAirDatepicker };
