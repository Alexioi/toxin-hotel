import 'air-datepicker';

class AirDatepicker {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  _init() {
    this._initAirDatepicker();
  }

  getSelectedDates() {
    return this.datepickerData.selectedDates;
  }

  clearDates() {
    this.datepickerData.clear();
  }

  _initAirDatepicker() {
    const airDatepickerOptions = {
      range: true,
      navTitles: {
        days: 'MM yyyy',
      },
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      minDate: new Date(),
    };

    this.datepickerData = this.$node.datepicker(airDatepickerOptions).data().datepicker;
  }
}

export default AirDatepicker;
