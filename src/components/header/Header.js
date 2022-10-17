import cssSelectors from './constants';

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
    document.addEventListener('click', this._onClickEventHandler.bind(this));
  }

  _onClickEventHandler(event) {
    const isCurrentMenuTarget = event.target.closest(cssSelectors.menu) === this.menu;
    const isCurrentToggleButton = event.target !== this.toggleButton;

    if (!isCurrentMenuTarget && isCurrentToggleButton) {
      this._closeSubNavigationList();
    }
  }

  _toggleSubNavigationList(targetIndex) {
    this.subNavigationLists[targetIndex].classList.toggle('header__sub-navigation-list_opened');
  }

  _closeSubNavigationList(targetIndex) {
    this.subNavigationLists[targetIndex].classList.remove('header__sub-navigation-list_opened');
  }

  _toggleNavigation() {
    this.component.classList.toggle('header__mobile-navigation-opened');
  }
}

export default Header;
