import DropdownMenu from './DropdownMenu';

class DropdownMenuRooms extends DropdownMenu {
  _attachEventHandlers() {
    super._attachEventHandlers();

    this.$items.each((i) => {
      this.dropdownItems[i].on('updatedCounter', this._updateInput.bind(this));
    });
  }

  _calculateValue(counterValues) {
    const dropdownItems = [
      ['спальня', 'спален'],
      ['кровать', 'кроватей'],
      ['ванная комната', 'ванных комнат'],
    ];

    const integerCounterValues = [
      Number(counterValues[0]),
      Number(counterValues[1]),
      Number(counterValues[2]),
    ];

    const value = [];

    integerCounterValues.forEach((integerCounterValue, i) => {
      if (integerCounterValue === 0) {
        return;
      }
      if (integerCounterValues === 1) {
        value.push(`${integerCounterValue} ${dropdownItems[i][0]}`);
        return;
      }
      value.push(`${integerCounterValue} ${dropdownItems[i][1]}`);
    });

    if (value.length === 0) {
      return 'Сколько комнат';
    }

    return value.join(', ');
  }
}

export default DropdownMenuRooms;
