import "./dropdown.scss";

class Dropdown {
  constructor(component) {
    this.component = component;
    this.textField = this.component.querySelector(".js-dropdown__text-field");
    this.input = this.component.querySelector(".js-dropdown__input");
    this.buttons = this.component.querySelectorAll(
      ".js-dropdown__counter-button"
    );
    this.counterValues = this.component.querySelectorAll(
      ".js-dropdown__counter"
    );
    this.cancel = this.component.querySelector(".js-dropdown__cancel");
    this.apply = this.component.querySelector(".js-dropdown__apply");
    this._attachEventHandlers();
    this._addInputValue();
    this._disableEachCounterButton();
  }

  _attachEventHandlers() {
    this.textField.addEventListener("click", () => this._toggleDropdownList());
    this.buttons.forEach((node) => {
      node.addEventListener("click", () => this._clickCounterButton());
    });
    if (this.component.querySelector(".dropdown__buttons")) {
      this.cancel.addEventListener("click", () => this._cancelCounterValue());
      this.apply.addEventListener("click", () => this._applyCounterValue());
    }
  }

  _toggleDropdownList() {
    this.component.classList.toggle("dropdown_opened");
  }

  _clickCounterButton() {
    let counterButtonType = event.target.dataset.type;

    counterButtonType === "minus"
      ? this._reduceCounter()
      : this._increaseCounter();
  }

  _reduceCounter() {
    let index = event.target.dataset.index;
    let counterValues = this.counterValues[index];
    let counterButton = event.target;

    if (this._isCounterMoreZero(index)) {
      counterValues.innerHTML--;
    }

    this._disableCounterButton(counterButton, index);
  }

  _increaseCounter() {
    let index = event.target.dataset.index;
    let counterValues = this.counterValues[index];
    let counterButton = event.target;

    counterValues.innerHTML++;

    this._enableCounterButton(counterButton, index);
  }

  _isCounterMoreZero(index) {
    let counterValues = this.counterValues[index];

    return counterValues.innerHTML > 0;
  }

  _disableCounterButton(counterButton, index) {
    if (!this._isCounterMoreZero(index)) {
      counterButton.classList.add("dropdown__counter-button_disabled");
    }
  }

  _disableEachCounterButton() {
    let counterButtons = this.component.querySelectorAll('[data-type="minus"]');

    counterButtons.forEach((counterButton, index) =>
      this._disableCounterButton(counterButton, index)
    );
  }

  _enableCounterButton() {
    let index = event.target.dataset.index;

    let counterButton = this.component.querySelectorAll('[data-type="minus"]')[
      index
    ];

    counterButton.classList.remove("dropdown__counter-button_disabled");
  }

  _addInputValue() {
    let dropdownItems = this._dropdownItems();

    let counterValues = this.counterValues;

    let inputValues = this._addEnding(counterValues, dropdownItems);

    this.input.value = inputValues.join(", ");
  }

  _dropdownItems() {
    const dropdownItems = [
      { one: "спальня", two: "спальни", more: "спален" },
      { one: "кровать", two: "кровати", more: "кроватей" },
      { one: "ванная комната", two: "ванные комнаты", more: "ванных комнат" },
    ];

    return dropdownItems;
  }

  _addEnding(counterValues, dropdownItems) {
    let inputValues = [];

    counterValues.forEach((counterValue, index) => {
      switch (counterValue.innerHTML) {
        case "0":
          break;
        case "1":
          counterValue =
            counterValue.innerHTML + " " + dropdownItems[index].one;
          inputValues.push(counterValue);
          break;
        case "2":
          counterValue =
            counterValue.innerHTML + " " + dropdownItems[index].two;
          inputValues.push(counterValue);
          break;
        default:
          counterValue =
            counterValue.innerHTML + " " + dropdownItems[index].more;
          inputValues.push(counterValue);
          break;
      }
    });

    return inputValues;
  }

  _cancelCounterValue() {
    this.counterValues.forEach((counterValue) => (counterValue.innerHTML = 0));
    this._disableEachCounterButton();
  }

  _applyCounterValue() {
    this._addInputValue();
  }
}

class DropdownRooms extends Dropdown {
  _reduceCounter() {
    super._reduceCounter();
    super._addInputValue();
  }

  _increaseCounter() {
    super._increaseCounter();
    super._addInputValue();
  }
}

class DropdownGuests extends Dropdown {}

(() => {
  document.querySelectorAll(".js-dropdown.dropdown_rooms").forEach((node) => {
    new DropdownRooms(node);
  });
})();

(() => {
  document.querySelectorAll(".js-dropdown.dropdown_guests").forEach((node) => {
    new DropdownGuests(node);
  });
})();
