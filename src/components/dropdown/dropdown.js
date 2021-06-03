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
    this.itemName = this.component.querySelectorAll(".js-dropdown__item-name");
    this._attachEventHandlers();
    this._addInputValue();
    this._disableEachCounterButton()
  }

  _attachEventHandlers() {
    this.textField.addEventListener("click", () => this._toggleDropdownList());
    this.buttons.forEach((node) => {
      node.addEventListener("click", () => this._clickCounterButton());
    });
  }

  _toggleDropdownList() {
    this.component.classList.toggle("dropdown_opened");
  }

  _clickCounterButton() {
    let counterButtonType = event.target.dataset.type

    counterButtonType === "minus" ? 
    this._reduceCounter() : 
    this._increaseCounter()
  }

  _reduceCounter() {
    let index = event.target.dataset.index;
    let counterValues = this.counterValues[index];
    let counterButton = event.target

    if (this._isCounterMoreZero(index)) {
      counterValues.innerHTML-- 
    } 
    
    this._disableCounterButton(counterButton, index);
  }

  _increaseCounter() {
    let index = event.target.dataset.index;
    let counterValues = this.counterValues[index];
    let counterButton = event.target

    counterValues.innerHTML++;

    this._enableCounterButton(counterButton, index);
  }

  _isCounterMoreZero(index) {
    let counterValues = this.counterValues[index];
    
    return counterValues.innerHTML > 0;
  }

  _disableCounterButton(counterButton, index) {
    if (!(this._isCounterMoreZero(index))) {
      counterButton.classList.add("dropdown__counter-button_disabled")
    } 
  }

  _disableEachCounterButton() {
    let counterButtons = this.component.querySelectorAll('[data-type="minus"]')
    
    counterButtons.forEach((counterButton, index) => this._disableCounterButton(counterButton, index))
    
  }

  _enableCounterButton() { 
    let index = event.target.dataset.index;

    let counterButton = this.component.querySelectorAll('[data-type="minus"]')[index]

    counterButton.classList.remove("dropdown__counter-button_disabled")   
  }

  _addInputValue() {
    let inputValues = [];

    this.counterValues.forEach( (counterValue, index) =>
    {
      let counterValueText = counterValue.innerHTML
      let itemNameText = this.itemName[index].innerHTML

      if (this._isCounterMoreZero(index)) {
        let obj = {count: counterValueText, text: itemNameText}

        inputValues.push(obj)

      }
    })
    
    inputValues = this._correctEnding(inputValues)

    

    this.input.value = inputValues.join(', ');
  }

  _correctEnding(inputValues) {
    inputValues = inputValues.map((inputValue) =>
    {
      // switch (inputValue.count) {
      // case 
      // }
    })

    return inputValues
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
