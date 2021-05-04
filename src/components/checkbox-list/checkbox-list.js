import './checkbox-list.scss';


class CheckboxList {
  constructor(component) {
    this.component = component;
    this.button = this.component.querySelector(".js-checkbox-list__button");
    this.list = this.component.querySelector(".js-checkbox-list__list");
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.button.addEventListener("click", () => {
      this._toggleList();
    });
  }

  _toggleList() {
    this.list.classList.toggle("js-checkbox-list__list_closed");
    this.button.classList.toggle("js-checkbox-list__button_inverted");
  }

}

(() => {
  document.querySelectorAll(".js-checkbox-list").forEach((node) => {
    new CheckboxList(node);
  });
})();