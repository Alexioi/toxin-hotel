import AirDatepicker from '@libs/air-datepicker';
import cssSelectors from './constants';
import HTMLInputElementWithPlugin from './types';
import calculateFullDate from './methods';

import helpers from '../../../helpers';

class Calendar {
  private node: Element;

  private inputs: NodeListOf<HTMLInputElementWithPlugin> | never[] = [];

  private toggleButtons: NodeListOf<Element> | never[] = [];

  private menu: Element | null = null;

  private apply: Element | null = null;

  private clear: Element | null = null;

  private datepicker: AirDatepicker | null = null;

  constructor(node: Element) {
    this.node = node;

    // eslint-disable-next-line fsd/no-heavy-constructor
    this.onblur = this.onblur.bind(this);
    this.applyDates = this.applyDates.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.onClickDocument = this.onClickDocument.bind(this);

    this.init();
  }

  private init() {
    this.findAndAssignElements();
    this.initDatepicker();
    this.attachEventsHandler();
  }

  private findAndAssignElements() {
    this.inputs = this.node.querySelectorAll(cssSelectors.input);
    this.toggleButtons = this.node.querySelectorAll(cssSelectors.toggleButtons);
    this.menu = this.node.querySelector(cssSelectors.menu);
    this.apply = this.node.querySelector(cssSelectors.applyButton);
    this.clear = this.node.querySelector(cssSelectors.clearButton);
  }

  private initDatepicker() {
    const datepickerNode = this.node.querySelector(cssSelectors.datepicker);

    // @ts-ignore
    this.datepicker = new AirDatepicker(datepickerNode);
  }

  private attachEventsHandler() {
    this.apply?.addEventListener('click', this.applyDates);
    this.clear?.addEventListener('click', this.clearDates);
    this.toggleButtons.forEach((node) => {
      node.addEventListener('click', this.toggleVisible);
    });
    this.inputs.forEach((node) => {
      node.addEventListener('blur', this.onblur);
    });
    document.addEventListener('click', this.onClickDocument);
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
      this.menu?.classList.remove('calendar__menu_visible');

      this.inputs.forEach((node, i) => {
        this.inputs[i].classList.remove('text-field__input_focused');
      });
    }
  }

  applyDates() {
    const [datepickerFrom, datepickerTo] = this.datepicker?.getSelectedDates();

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
    this.datepicker?.clearDates();
  }

  toggleVisible() {
    this.menu?.classList.toggle('calendar__menu_visible');

    const isOpened = this.menu?.classList.contains('calendar__menu_visible');

    this.inputs.forEach((node, i) => {
      if (isOpened) {
        this.inputs[i].classList.add('text-field__input_focused');
      } else {
        this.inputs[i].classList.remove('text-field__input_focused');
      }
    });

    this.datepicker?.clearDates();

    if (this.inputs.length === 2) {
      const [inputFrom, inputTo] = this.inputs;

      const [from] = inputFrom.plugin.getDates();

      const [to] = inputTo.plugin.getDates();

      if (from.year !== '') {
        const { day, month, year } = from;

        this.datepicker?.changeDate(`${year}.${month}.${day}`);
      }

      if (to.year !== '') {
        const { day, month, year } = to;

        this.datepicker?.changeDate(`${year}.${month}.${day}`);
      }
    } else {
      const [input] = this.inputs;

      const [from, to] = input.plugin.getDates();

      if (from.year !== '') {
        this.datepicker?.changeDate(`${from.year}.${from.month}.${from.day}`);

        this.datepicker?.changeDate(`${to.year}.${to.month}.${to.day}`);
      }
    }
  }
}

export default Calendar;
