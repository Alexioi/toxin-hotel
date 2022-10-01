import DropdownMenu from './DropdownMenu';

class DropdownMenuGuests extends DropdownMenu {
  _init() {
    super._init();

    this._checkDisplayOfClearButton();
  }

  _attachEventHandlers() {
    super._attachEventHandlers();

    this.$clearButton.on('click', this._resetCounters.bind(this));
    this.$applyButton.on('click', this._updateInput.bind(this));
    this.$applyButton.on('click', this._toggleMenu.bind(this));

    this.$items.each((i) => {
      this.dropdownItems[i].on('increasedCounterValue', this._showClearButton.bind(this));
    });

    this.$items.each((i) => {
      this.dropdownItems[i].on('counterValueIsZero', this._checkDisplayOfClearButton.bind(this));
    });
  }

  _checkDisplayOfClearButton() {
    let sumOfCounterValues = 0;

    this.$items.each((i) => {
      sumOfCounterValues += Number(this.dropdownItems[i].getCounter());
    });

    if (sumOfCounterValues === 0) {
      this._hideClearButton();
      return;
    }

    this._showClearButton();
  }

  _calculateValue(counterValues) {
    const dropdownItems = [
      ['гость', 'гости'],
      ['младенец', 'младенцы'],
    ];

    const integerCounterValues = [
      Number(counterValues[0]) + Number(counterValues[1]),
      Number(counterValues[2]),
    ];

    const value = [];

    integerCounterValues.forEach((integerCounterValue, i) => {
      if (integerCounterValue === 0) {
        return;
      }
      if (integerCounterValue === 1) {
        value.push(`${integerCounterValue} ${dropdownItems[i][0]}`);
        return;
      }
      value.push(`${integerCounterValue} ${dropdownItems[i][1]}`);
    });

    if (value.length === 0) {
      return 'Сколько гостей';
    }

    return value.join(', ');
  }

  _resetCounters() {
    super._resetCounters();

    this._hideClearButton();
  }

  _hideClearButton() {
    this.$clearButton.hide();
  }

  _showClearButton() {
    this.$clearButton.show();
  }
}

export default DropdownMenuGuests;
