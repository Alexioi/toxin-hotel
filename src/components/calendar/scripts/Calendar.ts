import { helpers } from '@helpers';

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

  private props: { isOpened: boolean };

  constructor(node: Element) {
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleCleanButtonClick = this.handleCleanButtonClick.bind(this);
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    const { dom, libs, props } = this.init(node);

    this.dom = dom;
    this.libs = libs;
    this.props = props;
  }

  private init(node: Element) {
    const dom = initNodes(node);
    const datepicker = createDatepicker(node);

    this.attachEventsHandler(dom);

    const isOpened = dom.menu.classList.contains('calendar__menu_visible');

    return { dom, libs: { datepicker }, props: { isOpened } };
  }

  private attachEventsHandler(dom: Dom) {
    const { apply, clear, toggleButtons, inputs } = dom;

    apply.addEventListener('click', this.handleApplyButtonClick);
    clear.addEventListener('click', this.handleCleanButtonClick);
    toggleButtons.forEach((el) => {
      el.addEventListener('click', this.handleToggleButtonClick);
    });
    inputs.forEach((el) => {
      el.addEventListener('blur', this.handleInputBlur);
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
    const { isOpened } = this.props;
    const newIsOpened = toggleMenu(menu, inputs, isOpened);

    this.props = { isOpened: newIsOpened };

    selectDatesInDatepicker(this.libs.datepicker, inputs);
  }

  private handleInputBlur() {
    displayDates(this.dom.inputs);
  }

  private handleDocumentClick(event: Event) {
    const { menu, toggleButtons, inputs } = this.dom;
    const [firstToggleButton, secondToggleButton] = toggleButtons;
    const elements = [menu, firstToggleButton, secondToggleButton];

    if (helpers.isElementsIncludeNode(event, elements)) {
      return;
    }

    const newIsOpened = closeMenu(menu, inputs);

    this.props = { isOpened: newIsOpened };
  }
}

export { Calendar };
