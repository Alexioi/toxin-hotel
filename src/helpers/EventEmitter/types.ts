type date = { day: string; month: string; year: string };

type EventObject =
  | {
      eventName: 'UpdatedDates';
      eventArguments: {
        dates: date[];
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
      eventArguments: { index: number };
    }
  | {
      eventName: 'DecrementCounter';
      eventArguments: { index: number };
    }
  | {
      eventName: 'UpdateCounters';
      eventArguments: { counters: number[]; value: string };
    };

type EventNames =
  | 'UpdatedDates'
  | 'InputData'
  | 'TouchInput'
  | 'DeleteData'
  | 'BlurInput'
  | 'UpdateCounters'
  | 'IncrementCounter'
  | 'DecrementCounter';

export { EventObject, EventNames };
