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
      navigationButton.addEventListener('click', this._openSubNavigationList.bind(this, index));
    });
  }

  _closeSubNavigationList(targetIndex) {
    event.stopImmediatePropagation();
    if (!event.path.includes(this.subNavigationLists[targetIndex])) {
      console.log(targetIndex, event);
      this.subNavigationLists[targetIndex].classList.remove('header__sub-navigation-list_opened');
      document.removeEventListener('click', this._closeSubNavigationList);
    }
  }

  _openSubNavigationList(targetIndex) {
    if (
      !this.subNavigationLists[targetIndex].classList.contains('header__sub-navigation-list_opened')
    ) {
      this.subNavigationLists[targetIndex].classList.add('header__sub-navigation-list_opened');
      document.addEventListener('click', this._closeSubNavigationList.bind(this, targetIndex));
    }
  }

  _toggleNavigation() {
    this.component.classList.toggle('header__mobile-navigation-opened');
  }
}

export default Header;
