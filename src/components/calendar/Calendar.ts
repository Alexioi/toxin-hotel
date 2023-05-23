import AirDatepicker from '@libs/air-datepicker';
import cssSelectors from './constants';
import TextField from '../text-field/TextField';

import helpers from '../../helpers';
import { date } from '../text-field/types';

const calculateFullDate = (date: Date): date => {
  let day = String(date.getDate());
  let month = String(Number(date.getMonth()) + 1);
  const year = String(date.getFullYear());
  if (day.length !== 2) {
    day = `0${day}`;
  }
  if (month.length !== 2) {
    month = `0${month}`;
  }
  return { day, month, year };
};

interface HTMLInputElementWithPlugin extends HTMLInputElement {
  plugin: TextField;
}

class Calendar {
  private node: HTMLDivElement;

  private inputs!: NodeListOf<HTMLInputElementWithPlugin>;

  private toggleButtons!: NodeListOf<HTMLButtonElement>;

  private menu!: HTMLDivElement;

  private apply!: HTMLButtonElement;

  private clear!: HTMLButtonElement;

  private datepicker!: AirDatepicker;

  constructor(node: HTMLDivElement) {
    this.node = node;

    this.init();
  }

  private init() {
    this.findNodes();
    this.initDatepicker();
    this.attachEventsHandler();
  }

  private findNodes() {
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

  private initDatepicker() {
    const datepickerNode = <HTMLElement>(
      this.node.querySelector(cssSelectors.datepicker)
    );

    this.datepicker = new AirDatepicker(datepickerNode);
  }

  private attachEventsHandler() {
    this.apply.addEventListener('click', this.applyDates.bind(this));
    this.clear.addEventListener('click', this.clearDates.bind(this));
    this.toggleButtons.forEach((node) => {
      node.addEventListener('click', this.toggleVisible.bind(this));
    });
    this.inputs.forEach((node) => {
      node.addEventListener('blur', this.onblur.bind(this));
    });
    document.addEventListener('click', this.onClickDocument.bind(this));
  }

  private onblur() {
    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      const [from] = inputFrom.plugin.getDates();

      const [to] = inputTo.plugin.getDates();

      if (from.year.length === 4 && to.year.length === 4) {
        const fromDate = `${from.year}.${from.month}.${from.day}`;
        const toDate = `${to.year}.${to.month}.${to.day}`;

        if (new Date(fromDate) > new Date(toDate)) {
          inputFrom.plugin.setDates([to]);

          inputTo.plugin.setDates([from]);
        }
      }
    } else {
      const [input] = this.inputs;

      const [from, to] = input.plugin.getDates();

      if (to.year.length === 4) {
        const fromDate = `${from.year}.${from.month}.${from.day}`;
        const toDate = `${to.year}.${to.month}.${to.day}`;

        if (new Date(fromDate) > new Date(toDate)) {
          input.plugin.setDates([to, from]);
        }
      }
    }
  }

  private onClickDocument(event: Event) {
    const [firstButton, secondButton] = this.toggleButtons;
    const elements = [this.menu, firstButton, secondButton];
    if (!helpers.isElementsIncludeNode(event, elements)) {
      this.menu.classList.remove('calendar__menu_visible');

      this.inputs.forEach((node, i) => {
        this.inputs[i].classList.remove('text-field__input_focused');
      });
    }
  }

  private applyDates() {
    const [datepickerFrom, datepickerTo] = this.datepicker.getSelectedDates();

    if (typeof datepickerTo === 'undefined') {
      return;
    }

    const from = calculateFullDate(datepickerFrom);
    const to = calculateFullDate(datepickerTo);

    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      inputFrom.plugin.setDates([from]);

      inputTo.plugin.setDates([to]);
    }

    if (this.inputs.length === 1) {
      const [input] = this.inputs;

      input.plugin.setDates([from, to]);
    }
  }

  private clearDates() {
    const emptyDate = {
      day: '',
      month: '',
      year: '',
    };

    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      inputFrom.plugin.setDates([{ ...emptyDate }]);

      inputTo.plugin.setDates([{ ...emptyDate }]);
    }

    if (this.inputs.length === 1) {
      const [input] = this.inputs;

      input.plugin.setDates([{ ...emptyDate }, { ...emptyDate }]);
    }
    this.datepicker.clearDates();
  }

  private toggleVisible() {
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

      const [from] = inputFrom.plugin.getDates();

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

      const [from, to] = input.plugin.getDates();

      if (from.year !== '') {
        this.datepicker.changeDate(`${from.year}.${from.month}.${from.day}`);

        this.datepicker.changeDate(`${to.year}.${to.month}.${to.day}`);
      }
    }
  }
}

export default Calendar;
