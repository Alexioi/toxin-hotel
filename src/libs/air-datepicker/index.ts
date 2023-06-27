import 'air-datepicker';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
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
  private $node: JQueryWithAirDatepicker;

  private datepickerData: DatepickerData | null = null;

  constructor($node: JQueryWithAirDatepicker) {
    this.$node = $node;

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
  }

  public clearDates() {
    this.datepickerData?.clear();
  }

  private init() {
    this.initAirDatepicker();
  }

  private initAirDatepicker() {
    const airDatepickerOptions = {
      range: true,
      navTitles: { days: 'MM yyyy' },
      prevHtml: `<svg class="datepicker__icon datepicker__icon_back">${arrow}</svg>`,
      nextHtml: `<svg class="datepicker__icon">${arrow}</svg>`,
      minDate: new Date(),
    };

    this.datepickerData = this.$node
      .datepicker(airDatepickerOptions)
      .data().datepicker;
  }
}

export { AirDatepicker, JQueryWithAirDatepicker };
