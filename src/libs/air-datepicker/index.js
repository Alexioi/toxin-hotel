import 'air-datepicker';

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
      prevHtml: '<div class="datepicker--nav-action-icon-back"></div>',
      nextHtml: '<div class="datepicker--nav-action-icon-forward"></div>',
      minDate: new Date(),
    };

    this.datepickerData = this.$node
      .datepicker(airDatepickerOptions)
      .data().datepicker;
  }
}

export default AirDatepicker;
