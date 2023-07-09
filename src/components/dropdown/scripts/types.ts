import { EventEmitter } from '@helpers/EventEmitter';

type DropdownEventEmitter = EventEmitter<{
  IncrementCounter: { index: number };
  DecrementCounter: { index: number };
  ApplyDropdownData: null;
  ClearCounters: null;
  UpdateCounters: {
    counters: number[];
    value: string;
  };
  UpdateValue: { value: string };
}>;

export { DropdownEventEmitter };
