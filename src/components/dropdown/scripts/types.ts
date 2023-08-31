type ViewEvents = {
  applyDropdownData: null;
  clearCounters: null;
};

type CounterEvents = {
  IncrementCounter: { index: number };
  DecrementCounter: { index: number };
};

type ModelEvents = {
  updateCounters: {
    counters: number[];
    value: string;
  };
  updateValue: { value: string };
};

export { ModelEvents, ViewEvents, CounterEvents };
