import { HTMLInputElementWithPlugin } from '@components/text-field/scripts/TextField';
import { AirDatepicker } from '@libs/air-datepicker';

import { cssSelectors } from './constants';
import {
  applyDates,
  clearDates,
  closeMenu,
  createDatepicker,
  displayDates,
  selectDatesInDatepicker,
  toggleMenu,
} from './methods';

class Calendar {
  private root: Element;

  private inputs: NodeListOf<HTMLInputElementWithPlugin> | never[] = [];

  private toggleButtons: NodeListOf<Element> | never[] = [];

  private menu: Element | null = null;

  private apply: Element | null = null;

  private clear: Element | null = null;

  private datepicker: AirDatepicker | null = null;

  constructor(root: Element) {
    this.root = root;

    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleCleanButtonClick = this.handleCleanButtonClick.bind(this);
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.init();
  }

  private init() {
    this.initNodes().initDatepicker().attachEventsHandler();

    return this;
  }

  private initNodes() {
    this.inputs = this.root.querySelectorAll(cssSelectors.input);
    this.toggleButtons = this.root.querySelectorAll(cssSelectors.toggleButtons);
    this.menu = this.root.querySelector(cssSelectors.menu);
    this.apply = this.root.querySelector(cssSelectors.applyButton);
    this.clear = this.root.querySelector(cssSelectors.clearButton);

    return this;
  }

  private initDatepicker() {
    this.datepicker = createDatepicker(this.root);

    return this;
  }

  private attachEventsHandler() {
    this.apply?.addEventListener('click', this.handleApplyButtonClick);
    this.clear?.addEventListener('click', this.handleCleanButtonClick);
    this.toggleButtons.forEach((node) => {
      node.addEventListener('click', this.handleToggleButtonClick);
    });
    this.inputs.forEach((node) => {
      node.addEventListener('blur', this.handleInputBlur);
    });
    document.addEventListener('click', this.handleDocumentClick);

    return this;
  }

  private handleInputBlur() {
    displayDates(this.inputs);
  }

  private handleDocumentClick(event: Event) {
    const [firstButton, secondButton] = this.toggleButtons;
    const elements = [this.menu, firstButton, secondButton];

    closeMenu(event, this.menu, this.inputs, elements);
  }

  private handleApplyButtonClick() {
    applyDates(this.datepicker, this.inputs);
  }

  private handleCleanButtonClick() {
    clearDates(this.datepicker, this.inputs);
  }

  private handleToggleButtonClick() {
    toggleMenu(this.menu, this.inputs);
    selectDatesInDatepicker(this.datepicker, this.inputs);
  }
}

export { Calendar };
