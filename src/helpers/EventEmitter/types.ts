type Date = { day: string; month: string; year: string };

type EventObject =
  | {
      eventName: 'UpdateDates';
      eventArguments: {
        dates: Date[];
      };
    }
  | {
      eventName: 'InputData';
      eventArguments: string;
    }
  | {
      eventName: 'TouchInput';
      eventArguments: null;
    }
  | {
      eventName: 'BlurInput';
      eventArguments: null;
    }
  | {
      eventName: 'DeleteData';
      eventArguments: null;
    }
  | {
      eventName: 'IncrementCounter';
      eventArguments: number;
    }
  | {
      eventName: 'DecrementCounter';
      eventArguments: number;
    }
  | {
      eventName: 'UpdateCounters';
      eventArguments: { counters: number[]; value: string };
    }
  | {
      eventName: 'ApplyDropdownData';
      eventArguments: null;
    }
  | {
      eventName: 'UpdateValue';
      eventArguments: string;
    }
  | {
      eventName: 'ClearCounters';
      eventArguments: null;
    };

type EventArguments =
  | { dates: Date[] }
  | null
  | string
  | number
  | { counters: number[]; value: string };

type EventObjectWithCallback =
  | {
      eventName: 'UpdateDates';
      callback: (args: { dates: Date[] }) => void;
    }
  | {
      eventName: 'InputData';
      callback: (args: string) => void;
    }
  | {
      eventName: 'TouchInput';
      callback: (args: null) => void;
    }
  | {
      eventName: 'BlurInput';
      callback: (args: null) => void;
    }
  | {
      eventName: 'DeleteData';
      callback: (args: null) => void;
    }
  | {
      eventName: 'IncrementCounter';
      callback: (args: number) => void;
    }
  | {
      eventName: 'DecrementCounter';
      callback: (args: number) => void;
    }
  | {
      eventName: 'UpdateCounters';
      callback: (args: { counters: number[]; value: string }) => void;
    }
  | {
      eventName: 'ApplyDropdownData';
      callback: (args: null) => void;
    }
  | {
      eventName: 'UpdateValue';
      callback: (args: string) => void;
    }
  | {
      eventName: 'ClearCounters';
      callback: (args: null) => void;
    };

type Callback<T> = (args: T) => void;

type Data =
  | string
  | null
  | { counters: number[]; value: string }
  | { dates: Date[] }
  | number;

type EventNames =
  | 'UpdateDates'
  | 'InputData'
  | 'TouchInput'
  | 'BlurInput'
  | 'DeleteData'
  | 'IncrementCounter'
  | 'DecrementCounter'
  | 'UpdateCounters'
  | 'ApplyDropdownData'
  | 'UpdateValue'
  | 'ClearCounters';

export {
  EventObject,
  EventObjectWithCallback,
  EventArguments,
  Callback,
  Data,
  EventNames,
};
