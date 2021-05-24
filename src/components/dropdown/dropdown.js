import "./dropdown.scss";

class Dropdown {
  constructor(component) {
    this.component = component;
    this.textField = this.component.querySelector(".js-dropdown__text-field");
    this.input = this.component.querySelector(".js-dropdown__input");
    this.buttons = this.component.querySelectorAll(
      ".js-dropdown__counter-button"
    );
    this.counterValue = this.component.querySelectorAll(
      ".js-dropdown__counter"
    );
    this.itemName = this.component.querySelectorAll(".js-dropdown__item-name");
    this._attachEventHandlers();
    this._addInputValue();
  }

  _attachEventHandlers() {
    this.textField.addEventListener("click", () => this._toggleDropdownList());
    this.buttons.forEach((node) => {
      if (node.dataset.type === "minus") {
        node.addEventListener("click", () => this._reduceCounter());
      } else if (node.dataset.type === "plus") {
        node.addEventListener("click", () => this._increaseCounter());
      }
    });
  }

  _toggleDropdownList() {
    this.component.classList.toggle("dropdown_opened");
  }

  _reduceCounter() {
    let index = event.target.dataset.index;
    let counterValue = this.counterValue[index];

    if (this._isCounterZero(index)) {
      counterValue.innerHTML--;
    }
    this._disableCounterButton(index);
  }

  _increaseCounter() {
    let index = event.target.dataset.index;
    this.counterValue[index].innerHTML++;
    this._disableCounterButton(index);
  }

  _isCounterZero(index) {
    return this.counterValue[index].innerHTML !== "0";
  }

  _addInputValue() {
    let inputValue = "";
    for (let i = 0; i < this.counterValue.length; i++) {
      if (this.counterValue[i].innerHTML !== "0") {
        inputValue +=
          this.counterValue[i].innerHTML + " " + this.itemName[i].innerHTML;
      }
    }
    this.input.value = inputValue;
  }

  _disableCounterButton(index) {
    let minus = this.component.querySelectorAll("[data-type='minus']");
    if (this.counterValue[index].innerHTML !== "0") {
      minus[index].classList.remove("dropdown__counter-button_disabled");
    } else {
      minus[index].classList.add("dropdown__counter-button_disabled");
    }
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
