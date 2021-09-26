class Header {
  constructor(component) {
    this.component = component;
    this.button = this.component.querySelector('.js-header__burger-button');
    this.nav = this.component.querySelector('.js-header__nav');
    this.login = this.component.querySelector('.js-header__login');
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.button.addEventListener('click', () => {
      this._toggleNav();
    });
  }

  _toggleNav() {
    this.nav.classList.toggle('header__nav_opened');
    this.login.classList.toggle('header__login_opened');
  }
}

(() => {
  document.querySelectorAll('.js-header').forEach((node) => {
    new Header(node);
  });
})();
