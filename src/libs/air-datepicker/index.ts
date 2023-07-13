import { init } from './methods';
import { DatepickerData, JQueryWithAirDatepicker } from './type';

class AirDatepicker {
  private props: {
    datepickerData: DatepickerData;
  };

  constructor(node: Element) {
    const { props } = init(node);

    this.props = props;
  }

  public getSelectedDates() {
    const [datepickerFrom, datepickerTo] =
      this.props.datepickerData.selectedDates;

    return { datepickerFrom, datepickerTo };
  }

  public changeDate(date: string) {
    this.props.datepickerData?.selectDate(new Date(date));

    return this;
  }

  public clearDates() {
    this.props.datepickerData?.clear();

    return this;
  }
}

export { AirDatepicker, JQueryWithAirDatepicker };
