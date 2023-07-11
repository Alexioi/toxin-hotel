import { AirDatepicker } from '@libs/air-datepicker';

import { Dom } from './type';
import {
  applyDates,
  clearDates,
  closeMenu,
  createDatepicker,
  displayDates,
  initNodes,
  selectDatesInDatepicker,
  toggleMenu,
} from './methods';

class Calendar {
  private dom: Dom;

  private datepicker: AirDatepicker | null;

  constructor(node: Element) {
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleCleanButtonClick = this.handleCleanButtonClick.bind(this);
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    const { dom, datepicker } = this.init(node);

    this.dom = dom;
    this.datepicker = datepicker;
  }

  private init(node: Element) {
    const dom = initNodes(node);
    const datepicker = createDatepicker(node);
    this.attachEventsHandler(dom);

    return { dom, datepicker };
  }

  private attachEventsHandler(dom: Dom) {
    const { apply, clear, toggleButtons, inputs } = dom;

    apply?.addEventListener('click', this.handleApplyButtonClick);
    clear?.addEventListener('click', this.handleCleanButtonClick);
    toggleButtons.forEach((node) => {
      node.addEventListener('click', this.handleToggleButtonClick);
    });
    inputs.forEach((node) => {
      node.addEventListener('blur', this.handleInputBlur);
    });
    document.addEventListener('click', this.handleDocumentClick);

    return this;
  }

  private handleInputBlur() {
    displayDates(this.dom.inputs);
  }

  private handleDocumentClick(event: Event) {
    const { menu, toggleButtons, inputs } = this.dom;
    const [firstToggleButton, secondToggleButton] = toggleButtons;
    const elements = [menu, firstToggleButton, secondToggleButton];

    closeMenu(event, menu, inputs, elements);
  }

  private handleApplyButtonClick() {
    applyDates(this.datepicker, this.dom.inputs);
  }

  private handleCleanButtonClick() {
    clearDates(this.datepicker, this.dom.inputs);
  }

  private handleToggleButtonClick() {
    const { menu, inputs } = this.dom;
    toggleMenu(menu, inputs);
    selectDatesInDatepicker(this.datepicker, inputs);
  }
}

export { Calendar };
