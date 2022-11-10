import 'air-datepicker';
import arrows from './arrows.json';

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
      prevHtml: arrows.arrowBack,
      nextHtml: arrows.arrowNext,
      minDate: new Date(),
    };

    this.datepickerData = this.$node.datepicker(airDatepickerOptions).data().datepicker;
  }
}

export default AirDatepicker;
