import EventEmitter from 'event-emitter';
import cssSelectors from './constants';

class DropdownMenuItem {
  constructor($node) {
    this.$node = $node;

    this._init();
  }

  resetCounter() {
    this.$counter.text('0');
    this._disableButton();
    this.emit('updatedCounter');
  }

  getCounter() {
    return this.$counter.text();
  }

  _init() {
    this._findNodes();
    this._attachEventHandlers();
    this._disableButton();
  }

  _findNodes() {
    this.$counter = this.$node.find(cssSelectors.counter);
    this.$counterButtons = this.$node.find(cssSelectors.counterButtons);
  }

  _attachEventHandlers() {
    this.$counterButtons[0].addEventListener('click', this._reduceCounter.bind(this));

    this.$counterButtons[1].addEventListener('click', this._addCounter.bind(this));
  }

  _addCounter() {
    const oldCounter = Number(this.$counter.text());
    const newCounter = String(oldCounter + 1);

    this.$counter.text(newCounter);
    this._enableButton();
    this.emit('updatedCounter');
    this.emit('increasedCounterValue');
  }

  _reduceCounter() {
    const oldCounter = Number(this.$counter.text());

    if (oldCounter === 0) {
      return;
    }

    const newCounter = String(oldCounter - 1);

    this.$counter.text(newCounter);
    this._disableButton();
    this.emit('updatedCounter');

    if (Number(newCounter) === 0) {
      this.emit('counterValueIsZero');
    }
  }

  _disableButton() {
    const counter = Number(this.$counter.text());

    if (counter === 0) {
      this.$counterButtons[0].classList.add('dropdown-menu__counter-button_disabled');
    }
  }

  _enableButton() {
    this.$counterButtons[0].classList.remove('dropdown-menu__counter-button_disabled');
  }
}

EventEmitter(DropdownMenuItem.prototype);

export default DropdownMenuItem;
