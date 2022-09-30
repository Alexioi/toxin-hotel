const cssSelectors = {
  header: '.js-header',
  button: '.js-header__burger-button',
  subNavigationLists: '.js-header__sub-navigation-list',
  navigationButtons: '.js-header__navigation-button',
  login: '.js-header__login',
};

function hasParentsSelector(node, selector) {
  let currentNode = node;

  while (currentNode !== null) {
    if (currentNode.classList.contains(selector)) {
      return true;
    }
    currentNode = currentNode.parentElement;
  }

  return false;
}

const hide = (event, dropNode, toggleSelector, dropSelector, openClass) => {
  if (
    !hasParentsSelector(event.target, dropSelector) &&
    !hasParentsSelector(event.target, toggleSelector)
  ) {
    dropNode.classList.remove(openClass);
  }

  if (hasParentsSelector(event.target, toggleSelector)) {
    dropNode.classList.toggle(openClass);
  }
};

const attachHidingEventHandlers = (dropNode, toggleSelector, dropSelector, openClass) => {
  document.addEventListener('click', (event) => {
    hide(event, dropNode, toggleSelector, dropSelector, openClass);
  });
};

class SubNavigationList {
  constructor(component, toggle) {
    this.component = component;
    this.toggle = toggle;

    this.init();
  }

  _init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    attachHidingEventHandlers(
      this.component,
      'header__navigation-button',
      'header__sub-navigation-list',
      'header__sub-navigation-list_opened',
    );
  }
}

class Header {
  constructor(component) {
    this.component = component;

    this._init();
  }

  _init() {
    this._findsElements();

    // this.subNavigationLists.forEach((node) => {
    //   new Header(node);
    // });

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
      // navigationButton.addEventListener('click', this._toggleSubNavigationList.bind(this, index));
      attachHidingEventHandlers(
        this.subNavigationLists[index],
        'header__navigation-button',
        'header__sub-navigation-list',
        'header__sub-navigation-list_opened',
      );
    });
  }

  // _toggleSubNavigationList(targetIndex) {
  //   this.subNavigationLists.forEach((subsNavigationList, index) => {
  //     if (targetIndex !== index) {
  //       subsNavigationList.classList.remove('header__sub-navigation-list_opened');
  //     }
  //   });
  //   this.subNavigationLists[targetIndex].classList.toggle('header__sub-navigation-list_opened');
  // }

  _toggleNavigation() {
    this.component.classList.toggle('header__mobile-navigation-opened');
  }
}

(() => {
  document.querySelectorAll(cssSelectors.header).forEach((node) => {
    new Header(node);
  });
})();
