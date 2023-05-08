type date = { day: string; month: string; year: string };

type dates = date[];

type data = {
  dates: dates;
  text: string;
};

type EventObject =
  | {
      eventName: 'UpdatedDates';
      eventArguments: {
        data: { dates: date[]; text: string };
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

export { EventObject, EventNames, data };
