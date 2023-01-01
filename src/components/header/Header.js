import cssSelectors from './constants';

import helpers from '../../helpers';

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
    this.subNavigationLists = this.component.querySelectorAll(
      cssSelectors.subNavigationLists,
    );
    this.navigationButtons = this.component.querySelectorAll(
      cssSelectors.navigationButtons,
    );
    this.login = this.component.querySelectorAll(cssSelectors.login);
  }

  _attachEventHandlers() {
    this.button.addEventListener('click', this._toggleNavigation.bind(this));
    this.navigationButtons.forEach((navigationButton, index) => {
      navigationButton.addEventListener(
        'click',
        this._toggleSubNavigationList.bind(this, index),
      );
    });
    document.addEventListener('click', this._onClickDocument.bind(this));
  }

  _onClickDocument(event) {
    this.subNavigationLists.forEach((list, index) => {
      const elements = [list, this.navigationButtons[index]];

      if (!helpers.isElementsIncludeNode(event, elements)) {
        this.constructor._closeSubNavigationList(list);
      }
    });
  }

  _toggleSubNavigationList(targetIndex) {
    this.subNavigationLists[targetIndex].classList.toggle(
      'header__sub-navigation-list_opened',
    );
  }

  static _closeSubNavigationList(node) {
    node.classList.remove('header__sub-navigation-list_opened');
  }

  _toggleNavigation() {
    this.component.classList.toggle('header__mobile-navigation-opened');
  }
}

export default Header;
