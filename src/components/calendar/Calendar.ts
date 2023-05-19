//@ts-ignore
import AirDatepicker from '@libs/air-datepicker';
import cssSelectors from './constants';

//@ts-ignore
import helpers from '../../helpers';

const calculateFullDate = (date: Date) => {
  let day = String(date.getDate());
  let month = String(Number(date.getMonth()) + 1);
  const year = date.getFullYear();
  if (day.length !== 2) {
    day = `0${day}`;
  }
  if (month.length !== 2) {
    month = `0${month}`;
  }
  return { day, month, year };
};

class Calendar {
  private node: HTMLDivElement;

  private inputs!: NodeListOf<HTMLInputElement>;

  private toggleButtons!: NodeListOf<HTMLButtonElement>;

  private menu!: HTMLDivElement;

  private apply!: HTMLButtonElement;

  private clear!: HTMLButtonElement;

  private datepicker!: any;

  constructor(node: HTMLDivElement) {
    this.node = node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._initDatepicker();
    this._attachEventsHandler();
  }

  _findNodes() {
    this.inputs = this.node.querySelectorAll(cssSelectors.input);
    this.toggleButtons = this.node.querySelectorAll(cssSelectors.toggleButtons);
    this.menu = <HTMLDivElement>this.node.querySelector(cssSelectors.menu);
    this.apply = <HTMLButtonElement>(
      this.node.querySelector(cssSelectors.applyButton)
    );
    this.clear = <HTMLButtonElement>(
      this.node.querySelector(cssSelectors.clearButton)
    );
  }

  _initDatepicker() {
    const datepickerNode = this.node.querySelector(cssSelectors.datepicker);

    this.datepicker = new AirDatepicker(datepickerNode);
  }

  _attachEventsHandler() {
    this.apply.addEventListener('click', this._applyDates.bind(this));
    this.clear.addEventListener('click', this._clearDates.bind(this));
    this.toggleButtons.forEach((node) => {
      node.addEventListener('click', this._toggleVisible.bind(this));
    });
    this.inputs.forEach((node) => {
      node.addEventListener('blur', this._onblur.bind(this));
    });
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onblur() {
    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      //@ts-ignore
      const [from] = inputFrom.plugin.getDates();
      //@ts-ignore
      const [to] = inputTo.plugin.getDates();

      if (from.year.length === 4 && to.year.length === 4) {
        const fromDate = `${from.year}.${from.month}.${from.day}`;
        const toDate = `${to.year}.${to.month}.${to.day}`;

        if (new Date(fromDate) > new Date(toDate)) {
          //@ts-ignore
          inputFrom.plugin.setDates([to]);
          //@ts-ignore
          inputTo.plugin.setDates([from]);
        }
      }
    } else {
      const [input] = this.inputs;
      //@ts-ignore
      const [from, to] = input.plugin.getDates();

      if (to.year.length === 4) {
        const fromDate = `${from.year}.${from.month}.${from.day}`;
        const toDate = `${to.year}.${to.month}.${to.day}`;

        if (new Date(fromDate) > new Date(toDate)) {
          //@ts-ignore
          input.plugin.setDates([to, from]);
        }
      }
    }
  }

  _onClickDocument(event: Event) {
    const [firstButton, secondButton] = this.toggleButtons;
    const elements = [this.menu, firstButton, secondButton];
    if (!helpers.isElementsIncludeNode(event, elements)) {
      this.menu.classList.remove('calendar__menu_visible');

      this.inputs.forEach((node, i) => {
        this.inputs[i].classList.remove('text-field__input_focused');
      });
    }
  }

  _applyDates() {
    const [datepickerFrom, datepickerTo] = this.datepicker.getSelectedDates();

    if (typeof datepickerTo === 'undefined') {
      return;
    }

    const from = calculateFullDate(datepickerFrom);
    const to = calculateFullDate(datepickerTo);

    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      //@ts-ignore
      inputFrom.plugin.setDates([from]);
      //@ts-ignore
      inputTo.plugin.setDates([to]);
    }

    if (this.inputs.length === 1) {
      const [input] = this.inputs;

      //@ts-ignore
      input.plugin.setDates([from, to]);
    }
  }

  _clearDates() {
    const emptyDate = {
      day: '',
      month: '',
      year: '',
    };

    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      //@ts-ignore
      inputFrom.plugin.setDates([{ ...emptyDate }]);
      //@ts-ignore
      inputTo.plugin.setDates([{ ...emptyDate }]);
    }

    if (this.inputs.length === 1) {
      const [input] = this.inputs;

      //@ts-ignore
      input.plugin.setDates([{ ...emptyDate }, { ...emptyDate }]);
    }
    this.datepicker.clearDates();
  }

  _toggleVisible() {
    this.menu.classList.toggle('calendar__menu_visible');

    const isOpened = this.menu.classList.contains('calendar__menu_visible');

    this.inputs.forEach((node, i) => {
      if (isOpened) {
        this.inputs[i].classList.add('text-field__input_focused');
      } else {
        this.inputs[i].classList.remove('text-field__input_focused');
      }
    });

    this.datepicker.clearDates();

    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      //@ts-ignore
      const [from] = inputFrom.plugin.getDates();
      //@ts-ignore
      const [to] = inputTo.plugin.getDates();

      if (from.year !== '') {
        const { day, month, year } = from;

        this.datepicker.changeDate(`${year}.${month}.${day}`);
      }

      if (to.year !== '') {
        const { day, month, year } = to;

        this.datepicker.changeDate(`${year}.${month}.${day}`);
      }
    } else {
      const [input] = this.inputs;
      //@ts-ignore
      const [from, to] = input.plugin.getDates();

      if (from.year !== '') {
        this.datepicker.changeDate(`${from.year}.${from.month}.${from.day}`);

        this.datepicker.changeDate(`${to.year}.${to.month}.${to.day}`);
      }
    }
  }
}

export default Calendar;
