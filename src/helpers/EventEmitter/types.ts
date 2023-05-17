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
    };

type EventNames =
  | 'UpdatedDates'
  | 'InputData'
  | 'TouchInput'
  | 'DeleteData'
  | 'BlurInput';

export { EventObject, EventNames };
