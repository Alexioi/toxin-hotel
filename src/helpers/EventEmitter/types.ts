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
      eventArguments: number;
    }
  | {
      eventName: 'TouchInput';
      eventArguments: null;
    }
  | {
      eventName: 'DeleteData';
      eventArguments: null;
    };

type EventNames = 'UpdatedDates' | 'InputData' | 'TouchInput' | 'DeleteData';

export { EventObject, EventNames };
