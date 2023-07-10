type ViewEvents = {
  ApplyDropdownData: null;
  ClearCounters: null;
};

type CounterEvents = {
  IncrementCounter: { index: number };
  DecrementCounter: { index: number };
};

type ModelEvents = {
  UpdateCounters: {
    counters: number[];
    value: string;
  };
  UpdateValue: { value: string };
};

export { ModelEvents, ViewEvents, CounterEvents };
