import cssSelectors from './scripts/constants';

import helpers from '../../helpers';
import Counter from './Counter';

const getIndex = (isUnit: boolean, isPair: boolean): 0 | 1 | 2 => {
  if (isUnit) {
    return 0;
  }

  if (isPair) {
    return 1;
  }

  return 2;
};

const getPlural = (forms: string[], count: number) => {
  const c10 = count % 10;
  const c100 = count % 100;
  const isUnit = c10 === 1 && c100 !== 11;
  const isPair = c10 >= 2 && c10 <= 4 && (c100 < 10 || c100 >= 20);
  const idx = getIndex(isUnit, isPair);

  return forms[idx] || '';
};

const calculateValues = (
  variants: string[][],
  counters: number[],
  placeholder: string,
) => {
  const value = [];

  variants.forEach((variant, index) => {
    const count = counters[index];

    if (count > 0) {
      value.push(`${count} ${getPlural(variant, count)}`);
    }
  });

  if (value.length === 0) {
    value.push(placeholder);
  }

  return value;
};

const calculateValue = (
  groups: number[],
  countersValue: number[],
  variants: string[][],
  placeholder: string,
) => {
  const counters = groups.map((group) => {
    const initialValue = 0;

    // @ts-ignore
    return group.reduce(
      (sum: string, index: number) => sum + countersValue[index],
      initialValue,
    );
  });

  const value = calculateValues(variants, counters, placeholder);

  return value.join(', ');
};

const toggleClearButton = (clearButton: Element, countersValue: number[]) => {
  if (clearButton === null) {
    return;
  }

  const countersSum = countersValue.reduce(
    (partialSum, counter) => partialSum + counter,
    0,
  );

  if (countersSum === 0) {
    clearButton.classList.add('dropdown__clear-button_hidden');
  } else {
    clearButton.classList.remove('dropdown__clear-button_hidden');
  }
};

class DropdownMenu {
  private node: HTMLDivElement;

  private input!: HTMLInputElement;

  private inputButton!: HTMLButtonElement;

  private textField!: HTMLInputElement;

  private items!: NodeListOf<HTMLDivElement>;

  private clearButton!: HTMLButtonElement;

  private applyButton!: HTMLButtonElement;

  private menu!: HTMLDivElement;

  private countersValue!: number[];

  private counters!: Counter[];

  private placeholder!: string;

  private groups!: number[];

  private variants!: string[][];

  constructor(node: HTMLDivElement) {
    this.node = node;

    this._init();
  }

  _init() {
    this._findNodes();
    this._initDates();
    this._attachEventHandlers();
    this._updateInput();
    this._toggleInputFocus();
    toggleClearButton(this.clearButton, this.countersValue);
    this._initCounters();
  }

  _findNodes() {
    this.input = this.node.querySelector(cssSelectors.input)!;
    this.inputButton = this.node.querySelector(cssSelectors.inputButton)!;
    this.textField = this.node.querySelector(cssSelectors.textField)!;
    this.items = this.node.querySelectorAll(cssSelectors.items);
    this.clearButton = this.node.querySelector(cssSelectors.clearButton)!;
    this.applyButton = this.node.querySelector(cssSelectors.applyButton)!;
    this.menu = this.node.querySelector(cssSelectors.menu)!;
  }

  _initCounters() {
    this.counters = this.countersValue.map((counter, index) => {
      const { node, items } = this;

      return new Counter(node, items[index], counter, index);
    });
  }

  _initDates() {
    // @ts-ignore
    this.variants = this.node.dataset.variants
      .split('-')
      .map((item) => item.split(','));

    //@ts-ignore
    this.groups = this.node.dataset.groups
      .split('-')
      .map((item) => item.split(','));

    this.placeholder = <string>this.node.dataset.placeholder;
    this.countersValue = [...this.items].map((item) => {
      const counter = item.querySelector(cssSelectors.counter)?.innerHTML;

      return Number(counter);
    });
  }

  _attachEventHandlers() {
    this.textField.addEventListener('click', this._toggleMenu.bind(this));

    if (this.clearButton !== null) {
      this.clearButton.addEventListener(
        'click',
        this._resetCounters.bind(this),
      );
    }

    if (this.applyButton !== null) {
      this.applyButton.addEventListener(
        'click',
        this._onApplyButton.bind(this),
      );
    }

    this.node.addEventListener(
      'counterUpdated',
      this._updateCounters.bind(this),
    );

    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _updateCounters(event: Event) {
    // @ts-ignore
    const { index, counter } = event.detail;
    this.countersValue[index] = counter;

    toggleClearButton(this.clearButton, this.countersValue);

    if (this.applyButton === null) {
      this._updateInput();
    }
  }

  _onClickDocument(event: Event) {
    const elements = [this.menu, this.input, this.inputButton];
    if (!helpers.isElementsIncludeNode(event, elements)) {
      this._closeMenu();
    }
  }

  _onApplyButton() {
    this._updateInput();
    this._toggleMenu();
  }

  _closeMenu() {
    this.node.classList.remove('dropdown_opened');

    this._toggleInputFocus();
  }

  _toggleMenu() {
    this.node.classList.toggle('dropdown_opened');
    this._toggleInputFocus();
  }

  _toggleInputFocus() {
    const isOpened = this.node.classList.contains('dropdown_opened');

    if (isOpened) {
      this.input.classList.add('text-field__input_opened');
    } else {
      this.input.classList.remove('text-field__input_opened');
    }
  }

  _resetCounters() {
    this.counters.forEach((counter) => {
      counter.resetCounter();
    });
  }

  _updateInput() {
    const { groups, countersValue, variants, placeholder } = this;

    this.input.value = calculateValue(
      groups,
      countersValue,
      variants,
      placeholder,
    );
  }
}

export default DropdownMenu;
