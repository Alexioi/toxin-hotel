import EventEmitter from '@helpers/EventEmitter';

import { calculateCounter, calculateValue, resetCounters } from './methods';

class Model {
  private eventEmitter: EventEmitter;

  private groups: number[][] = [[]];

  private counters: number[] = [];

  private variants: string[][] = [[]];

  private placeholder: string = '';

  constructor(
    eventEmitter: EventEmitter,
    groups: number[][],
    variants: string[][],
    placeholder: string,
    counters: number[],
  ) {
    this.eventEmitter = eventEmitter;

    this.init(groups, variants, placeholder, counters);
  }

  public incrementCounter(index: number) {
    const { counters } = this;

    this.counters = calculateCounter(counters, index, 1);

    this.emitValue();

    return this;
  }

  public decrementCounter(index: number) {
    const { counters } = this;

    this.counters = calculateCounter(counters, index, -1);

    this.emitValue();

    return this;
  }

  public resetCounters() {
    this.counters = resetCounters(this.counters);

    this.emitValue();

    return this;
  }

  public emitValue() {
    const { groups, counters, variants, placeholder } = this;

    const value = calculateValue(groups, counters, variants, placeholder);

    this.eventEmitter.emit({
      eventName: 'UpdateCounters',
      eventArguments: { counters, value },
    });

    return this;
  }

  private init(
    groups: number[][],
    variants: string[][],
    placeholder: string,
    counters: number[],
  ) {
    this.placeholder = placeholder;

    this.groups = groups;

    this.variants = variants;

    this.counters = counters;

    return this;
  }
}

export default Model;
