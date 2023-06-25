import EventEmitter from '@helpers/EventEmitter';

import {
  isArrayOfStringArrays,
  isArrayWithNumbers,
  calculateValue,
} from './methods';

class Model {
  private eventEmitter: EventEmitter;

  private groups: number[][] | never[] = [[]];

  private counters: number[] | never[] = [];

  private variants: string[][] = [[]];

  private placeholder: string = '';

  constructor(
    eventEmitter: EventEmitter,
    groups: any,
    variants: any,
    placeholder: any,
    counters: any,
  ) {
    this.eventEmitter = eventEmitter;

    this.init(groups, variants, placeholder, counters);
  }

  public incrementCounter(index: number) {
    this.counters[index] += 1;

    this.calculateValueAndNotify();
  }

  public decrementCounter(index: number) {
    if (this.counters[index] > 0) {
      this.counters[index] -= 1;
    }

    this.calculateValueAndNotify();
  }

  public resetCounters() {
    this.counters = this.counters.map(() => {
      return 0;
    });

    this.calculateValueAndNotify();
  }

  public getValue() {
    const { groups, counters, variants, placeholder } = this;

    const value = calculateValue(groups, counters, variants, placeholder);

    this.eventEmitter.emit({
      eventName: 'UpdateValue',
      eventArguments: value,
    });
  }

  private calculateValueAndNotify() {
    const { groups, counters, variants, placeholder } = this;

    const value = calculateValue(groups, counters, variants, placeholder);

    this.eventEmitter.emit({
      eventName: 'UpdateCounters',
      eventArguments: { counters, value },
    });
  }

  private init(groups: any, variants: any, placeholder: any, counters: any) {
    if (typeof placeholder === 'string') {
      this.placeholder = placeholder;
    }

    // if (isArrayWithNumbers(groups)) {
    this.groups = groups;
    // }

    if (isArrayOfStringArrays(variants)) {
      this.variants = variants;
    }

    if (isArrayWithNumbers(counters)) {
      this.counters = counters;
    }

    return this;
  }
}

export default Model;
