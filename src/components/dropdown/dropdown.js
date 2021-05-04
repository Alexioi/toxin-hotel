import "./dropdown.scss";

class Dropdown {
  constructor(component) {
    this.component = component;
    this.textField = this.component.querySelector(".js-dropdown__text-field");
    this.list = this.component.querySelector(".js-dropdown__list");
    this.input = this.component.querySelector(".js-dropdown__input");
    this.buttonMinus = this.component.querySelectorAll(
      ".js-dropdown__counter-button-minus"
    );
    this.counterValue = this.component.querySelectorAll(
      ".js-dropdown__counter-value"
    );
    this.buttonPlus = this.component.querySelectorAll(
      ".js-dropdown__counter-button-plus"
    );
    this.itemName = this.component.querySelectorAll(".js-dropdown__item-name");
    this._attachEventHandlers();
    this._addInputValue();
  }

  _attachEventHandlers() {
    this.textField.addEventListener("click", () => this._toggleDropdownList());
    this.buttonMinus.forEach((node, index) => {
      node.addEventListener("click", () => this._reduceCounter(index));
    });
    this.buttonPlus.forEach((node, index) => {
      node.addEventListener("click", () => this._increaseCounter(index));
    });
  }

  _toggleDropdownList() {
    this.list.classList.toggle("js-dropdown__list_open");
  }

  _reduceCounter(index) {
    if (this.counterValue[index].innerHTML !== "0") {
      this.counterValue[index].innerHTML--;
    }
  }

  _increaseCounter(index) {
    this.counterValue[index].innerHTML++;
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
}

class DropdownRooms extends Dropdown {
  _reduceCounter(index) {
    super._reduceCounter(index);
    super._addInputValue();
  }

  _increaseCounter(index) {
    super._increaseCounter(index);
    super._addInputValue();
  }
}

(() => {
  document.querySelectorAll(".js-dropdown_rooms").forEach((node) => {
    new DropdownRooms(node);
  });
})();
