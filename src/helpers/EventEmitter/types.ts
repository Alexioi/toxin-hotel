type Date = { day: string; month: string; year: string };

/* eslint-disable @typescript-eslint/indent */
type EventObject =
  | {
      eventName: 'UpdatedDates';
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

type EventNames =
  | 'UpdatedDates'
  | 'InputData'
  | 'TouchInput'
  | 'DeleteData'
  | 'BlurInput'
  | 'UpdateCounters'
  | 'IncrementCounter'
  | 'DecrementCounter'
  | 'ApplyDropdownData'
  | 'UpdateValue'
  | 'ClearCounters';

export { EventObject, EventNames };
