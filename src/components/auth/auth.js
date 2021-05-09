import "./auth.scss";

class Auth {
  constructor(component) {
    this.component = component;
    this.button = this.component.querySelectorAll(".auth__button");
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.button.forEach((node) => {
      node.addEventListener("click", () => {
        this._toggleAuth();
      });
    });
  }

  _toggleAuth() {
    this.component.classList.toggle("auth_registration");
  }
}

(() => {
  document.querySelectorAll(".js-auth").forEach((node) => {
    new Auth(node);
  });
})();
