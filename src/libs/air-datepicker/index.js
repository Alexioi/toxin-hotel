/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import 'air-datepicker';
import arrow from '!raw-loader!@images/decorative/arrow.svg';

class AirDatepicker {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  getSelectedDates() {
    return this.datepickerData.selectedDates;
  }

  changeDate(date) {
    this.datepickerData.selectDate(new Date(date));
  }

  clearDates() {
    this.datepickerData.clear();
  }

  _init() {
    this._initAirDatepicker();
  }

  _initAirDatepicker() {
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
