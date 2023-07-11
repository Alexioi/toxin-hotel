import { Dom, Libs } from './type';
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

  private libs: Libs;

  constructor(node: Element) {
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleCleanButtonClick = this.handleCleanButtonClick.bind(this);
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    const { dom, libs } = this.init(node);

    this.dom = dom;
    this.libs = libs;
  }

  private init(node: Element) {
    const dom = initNodes(node);
    const datepicker = createDatepicker(node);

    this.attachEventsHandler(dom);

    return { dom, libs: { datepicker } };
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

  private handleApplyButtonClick() {
    applyDates(this.libs.datepicker, this.dom.inputs);
  }

  private handleCleanButtonClick() {
    clearDates(this.libs.datepicker, this.dom.inputs);
  }

  private handleToggleButtonClick() {
    const { menu, inputs } = this.dom;
    toggleMenu(menu, inputs);
    selectDatesInDatepicker(this.libs.datepicker, inputs);
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
}

export { Calendar };
