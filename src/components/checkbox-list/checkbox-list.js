import "./checkbox-list.scss";

class CheckboxList {
  constructor(component) {
    this.component = component;
    this.button = this.component.querySelector(".js-checkbox-list__button");
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.button.addEventListener("click", () => {
      this._toggleList();
    });
  }

  _toggleList() {
    this.component.classList.toggle("checkbox-list_closed");
  }
}

(() => {
  document
    .querySelectorAll(".js-checkbox-list.checkbox-list_expanded")
    .forEach((node) => {
      new CheckboxList(node);
    });
})();
