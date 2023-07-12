import { EventEmitter } from '@helpers/EventEmitter';

import { ModelEvents } from '../../types';
import { calculateCounter, calculateValue, resetCounters } from './methods';
import { Props } from './type';

class Model extends EventEmitter<ModelEvents> {
  private props: Props;

  constructor(
    groups: number[][],
    variants: string[][],
    placeholder: string,
    counters: number[],
  ) {
    super();

    this.props = { placeholder, groups, variants, counters };
  }

  public incrementCounter(index: number) {
    const counters = calculateCounter(this.props.counters, index, 1);

    this.props = { ...this.props, counters };

    this.emitValue();

    return this;
  }

  public decrementCounter(index: number) {
    const counters = calculateCounter(this.props.counters, index, -1);

    this.props = { ...this.props, counters };

    this.emitValue();

    return this;
  }

  public resetCounters() {
    const counters = resetCounters(this.props.counters);

    this.props = { ...this.props, counters };

    this.emitValue();

    return this;
  }

  public calculateValue() {
    this.emitValue();
  }

  private emitValue() {
    const { groups, counters, variants, placeholder } = this.props;

    const value = calculateValue(groups, counters, variants, placeholder);

    this.emit('UpdateCounters', { counters, value });

    return this;
  }
}

export { Model };
