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
    this.button = this.component.querySelector('.js-header__burger-button');
    this.subNavigationLists = this.component.querySelectorAll('.js-header__sub-navigation-list');
    this.navigationButtons = this.component.querySelectorAll('.js-header__navigation-button');
    this.login = this.component.querySelectorAll('.js-header__login');
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
  document.querySelectorAll('.js-header').forEach((node) => {
    new Header(node);
  });
})();
