import EventEmitter from '@helpers/EventEmitter';

type DropdownEventEmitter = EventEmitter<{
  IncrementCounter: number;
  DecrementCounter: number;
  ApplyDropdownData: null;
  ClearCounters: null;
  UpdateCounters: {
    counters: number[];
    value: string;
  };
  UpdateValue: string;
}>;

export default DropdownEventEmitter;
