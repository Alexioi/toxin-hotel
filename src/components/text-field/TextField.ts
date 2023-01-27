type maskedType = 'none' | 'single' | 'double';

type date = {
  day: string;
  month: string;
  year: string;
};

type dates = date[];

const getType = (type: 'single' | 'double'): dates => {
  if (type === 'double') {
    return [
      { day: '', month: '', year: '' },
      { day: '', month: '', year: '' },
    ];
  }

  return [{ day: '', month: '', year: '' }];
};

class TextField {
  private node: HTMLInputElement;

  private dates!: dates;

  private type: maskedType;

  constructor(node: HTMLInputElement) {
    this.node = node;
    this.type = <maskedType>this.node.dataset.maskedType;

    // @ts-ignore
    this.node.plugin = this;

    this.init(this.type);
  }

  private init(type: maskedType) {
    if (type === 'none') {
      return;
    }

    this.dates = getType(type);

    this.attachEventsHandler();
  }

  private attachEventsHandler() {
    // this.node.addEventListener('focus', this._onFocus.bind(this));
    // @ts-ignore
    this.node.addEventListener('input', this.onInput);
    // this.node.addEventListener('paste', this.onPaste);
    // this.node.addEventListener('blur', this._onBlur.bind(this));
    // this.node.addEventListener('click', this._onClick.bind(this));
  }

  private onInput = (event: InputEvent) => {
    event.preventDefault();

    if (event.inputType === 'deleteContentBackward') {
      this.dates = this.removeDate(this.dates, this.type);

      this.displayDate(this.dates);
      return;
    }

    this.changeDate(event.data);
  };

  private changeDate(data: string | null): void {
    if (!TextField._isNumber(data)) {
      this.displayDate(this.dates);
      return;
    }

    const numberData = Number(data);

    const [from, to] = this.dates;

    if (typeof to === 'undefined' && from.year.length === 4) {
      const newTo = this._calculateDay(to, numberData);

      this.dates = [from, newTo];
      this.displayDate(this.dates);
      return;
    }

    const newFrom = this._calculateDay(from, numberData);

    this.dates = [newFrom];
    console.log(this.dates);

    this.displayDate(this.dates);
    // return;

    // this.dates = [{ day: '01', month: '01', year: '' }];

    // if (this.type === 'double') {
    //   let [from, to] = this.dates;

    //   if (from.length < 10) {
    //     from = this._calculateDay(from, numberData);
    //   } else {
    //     to = this._calculateDay(to, numberData);
    //   }

    //   this.dates = [from, to];

    //   this.displayDate(this.dates);
    //   return;
    // }

    // const date = this._calculateDay(this.dates[0], numberData);
    // this.dates = [date];

    // this.displayDate(this.dates);
  }

  private displayDate(dates: dates): void {
    const maskedDates = dates.map((date): string => {
      const { day, month, year } = date;

      const maskedDay = `${day}__`.slice(0, 2);
      const maskedMonth = `${month}__`.slice(0, 2);
      const maskedYear = `${year}____`.slice(0, 4);

      return `${maskedDay}.${maskedMonth}.${maskedYear}`;
    });

    this.node.value = maskedDates.join('-');
  }

  static _isNumber(key: string | null): boolean {
    if (key === null) {
      return false;
    }

    return /^\d$/.test(key);
  }

  private removeDate(dates: dates, type: maskedType): dates {
    const [from, to] = dates;

    if (type === 'double') {
      if (to.day.length !== 0) {
        const newTo = this.removeLastSymbolInDate(to);

        return [from, newTo];
      }

      const newFrom = this.removeLastSymbolInDate(from);

      return [newFrom, { day: '', month: '', year: '' }];
    }

    const newFrom = this.removeLastSymbolInDate(from);

    return [newFrom];
  }

  private removeLastSymbolInDate(date: date): date {
    const { day, month, year } = date;

    if (year.length > 0) {
      const newYear = year.slice(0, -1);

      return { day, month, year: newYear };
    }

    if (month.length > 0) {
      const newMonth = month.slice(0, -1);

      return { day, month: newMonth, year };
    }

    const newDay = day.slice(0, -1);

    return { day: newDay, month, year };
  }

  // _onClick() {
  //   this._displayDate(this.dates);
  // }

  // private onPaste = (event: ClipboardEvent) => {
  //   event.preventDefault();

  //   const inputDate = event.clipboardData?.getData('text');

  //   // inputDate.split('').forEach((value) => {
  //   //   this._changeDate(value);
  //   // });
  // };

  // _update() {
  //   this.dates = this.node.dataset.date.split(',');

  //   if (this.dates[0] === '') {
  //     this.node.value = '';
  //     return;
  //   }

  //   if (this.type === 'single') {
  //     this._displayDate(this.dates);
  //   }

  //   if (this.type === 'double') {
  //     let [firstDate, secondDate] = this.dates;

  //     firstDate = this.constructor._calculateDayAndMount(firstDate);
  //     secondDate = this.constructor._calculateDayAndMount(secondDate);

  //     this.node.value = `${firstDate} - ${secondDate}`;
  //   }
  // }

  // _onBlur() {
  //   if (TextField._isFullDate(this.dates)) {
  //     this._update();
  //     return;
  //   }

  //   this.dates = this.type === 'double' ? ',' : '';
  //   this.node.value = '';
  //   this.node.dataset.date = this.dates;
  // }

  // static _isFullDate(dates) {
  //   return dates.reduce((sum, current) => current.length === 10 && sum, true);
  // }

  // static _calculateDayAndMount(checkedDate) {
  //   const [day, month, year] = checkedDate.split('.').map((value, index) => {
  //     if (index === 1) {
  //       return Number(value) - 1;
  //     }
  //     return Number(value);
  //   });

  //   const monthNames = [
  //     'янв',
  //     'фев',
  //     'мар',
  //     'апр',
  //     'май',
  //     'июн',
  //     'июл',
  //     'авг',
  //     'сен',
  //     'окт',
  //     'ноя',
  //     'дек',
  //   ];

  //   const date = new Date(year, month, day);

  //   const monthNumber = date.getMonth();

  //   const monthName = monthNames[monthNumber];

  //   return `${day} ${monthName}`;
  // }

  // _setDates() {
  //   this.node.dataset.date = this.dates.join(',');
  // }

  // _onFocus() {
  //   this.dates = this.node.dataset.date.split(',');
  //   this._displayDate(this.dates);
  // }

  _calculateDay(date: date, key: number): date {
    const { day, month, year } = date;

    if (day.length === 2) {
      return this._calculateMonth(date, key);
    }

    if (day.length === 1) {
      if (day[0] === '0' && key === 0) {
        const newDay = `${day}1`;

        return { day: newDay, month, year };
      }

      if (day[0] === '3' && key > 0) {
        const newDay = `${day}1`;

        return { day: newDay, month, year };
      }

      const newDay = day + String(key);
      return { day: newDay, month, year };
    }

    if (key > 3) {
      const newDay = `${day}0${key}`;

      return { day: newDay, month, year };
    }

    const newDay = day + String(key);
    return { day: newDay, month, year };
  }

  _calculateMonth(date: date, key: number): date {
    const { day, month, year } = date;

    if (month === '') {
      if (Number(day) > 29 && key === 2) {
        return { day, month, year };
      }

      if (key > 1) {
        const newMonth = `0${key}`;

        return { day, month: newMonth, year };
      }

      const newMonth = `${key}`;

      return { day, month: newMonth, year };
    }

    if (month.length === 2) {
      return this._calculateYear(date, key);
    }

    if (Number(day) > 29 && key === 2) {
      return { day, month, year };
    }

    if (month[0] === '0' && key === 0) {
      const newMonth = `${key}1`;

      return { day, month: newMonth, year };
    }

    if (month[0] === '1' && key > 2) {
      const newMonth = `${key}2`;

      return { day, month: newMonth, year };
    }

    const newMonth = `${month}${key}`;

    return { day, month: newMonth, year };
  }

  _calculateYear(date: date, key: number): date {
    const { day, month, year } = date;

    if (year === '') {
      const newYear = `${key}`;

      return { day, month, year: newYear };
    }

    if (year.length === 4) {
      return date;
    }

    if (year.length === 3) {
      if (TextField._isValidDate(date, key)) {
        return { day, month, year: `${year}${key}` };
      }

      return date;
    }

    const newYear = `${year}${key}`;

    return { day, month, year: newYear };
  }

  static _isValidDate(checkedDate: date, key: number) {
    const { day, month, year } = checkedDate;

    const currentDate = new Date(
      Number(`${year}${key}`),
      Number(month),
      Number(day),
    );

    const dateYear = String(currentDate.getFullYear());
    const dateMonth = String(currentDate.getMonth());
    const dateDay = String(currentDate.getDate());

    return dateYear === year && dateMonth === month && dateDay === day;
  }

  //   this.node.value = values.join(' - ');

  //   this._setCaretPosition(values);
  //   this._setDates();
  // }

  // _setCaretPosition(values) {
  //   const valuesString = values.join(' - ');
  //   const cursorPosition = valuesString.indexOf('_');

  //   this.node.setSelectionRange(cursorPosition, cursorPosition);
  // }
}

export default TextField;
