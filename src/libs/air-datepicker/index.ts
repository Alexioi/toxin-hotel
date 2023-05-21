/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import 'air-datepicker';
// @ts-ignore
import arrow from '!raw-loader!@images/decorative/arrow.svg';

interface JQueryWithAirDatepicker extends JQuery {
  datepicker: (airDatepickerOptions: any) => any;
}

class AirDatepicker {
  private $node: JQueryWithAirDatepicker;

  private datepickerData: any;

  constructor(node: HTMLElement) {
    this.$node = <JQueryWithAirDatepicker>$(node);

    this._init();
  }

  public getSelectedDates() {
    return this.datepickerData.selectedDates;
  }

  public changeDate(date: string) {
    this.datepickerData.selectDate(new Date(date));
  }

  public clearDates() {
    this.datepickerData.clear();
  }

  private _init() {
    this._initAirDatepicker();
  }

  private _initAirDatepicker() {
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

export default AirDatepicker;
