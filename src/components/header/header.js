const cssSelectors = {
  header: '.js-header',
  button: '.js-header__burger-button',
  subNavigationLists: '.js-header__sub-navigation-list',
  navigationButtons: '.js-header__navigation-button',
  login: '.js-header__login',
};

class Header {
  constructor(component) {
    this.component = component;

    this._init();
  }

  _init() {
    this._findsElements();
    this._attachEventHandlers();
  }

  _findsElements() {
    this.button = this.component.querySelector(cssSelectors.button);
    this.subNavigationLists = this.component.querySelectorAll(cssSelectors.subNavigationLists);
    this.navigationButtons = this.component.querySelectorAll(cssSelectors.navigationButtons);
    this.login = this.component.querySelectorAll(cssSelectors.login);
  }

  _attachEventHandlers() {
    this.button.addEventListener('click', this._toggleNavigation.bind(this));
    this.navigationButtons.forEach((navigationButton, index) => {
      navigationButton.addEventListener('click', this._toggleSubNavigationList.bind(this, index));
    });
  }

  _toggleSubNavigationList(targetIndex) {
    this.subNavigationLists.forEach((subsNavigationList, index) => {
      if (targetIndex !== index) {
        subsNavigationList.classList.remove('header__sub-navigation-list_opened');
      }
    });
    this.subNavigationLists[targetIndex].classList.toggle('header__sub-navigation-list_opened');
  }

  _toggleNavigation() {
    this.component.classList.toggle('header__mobile-navigation-opened');
  }
}

(() => {
  document.querySelectorAll(cssSelectors.header).forEach((node) => {
    new Header(node);
  });
})();
