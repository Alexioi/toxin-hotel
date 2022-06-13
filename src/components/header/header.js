class Header {
  constructor(component) {
    this.component = component;
    this.button = this.component.querySelector('.js-header__burger-button');
    this.subNavigationLists = this.component.querySelectorAll('.js-header__sub-navigation-list');
    this.navigationButtons = this.component.querySelectorAll('.js-header__navigation-button');
    this.login = this.component.querySelectorAll('.js-header__login');
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.button.addEventListener('click', () => {
      this._toggleNavigation();
    });
    this.navigationButtons.forEach((navigationButton, index) => {
      navigationButton.addEventListener('click', () => {
        this._toggleSubNavigationList(index);
      });
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
