import {
  EventObject,
  EventObjectWithCallback,
  Callback,
  Data,
  EventNames,
} from './types';

const emitEvents = (
  events: Record<EventNames, Callback<Data>[]>,
  { eventName, eventArguments }: EventObject,
) => {
  if (events[eventName] !== undefined) {
    events[eventName].forEach((callback) => {
      callback.call(null, eventArguments);
    });
  }
};

const removeEvents = (
  events: Record<EventNames, Callback<Data>[]>,
  { eventName, callback }: EventObjectWithCallback,
) => {
  const newEvents = { ...events };
  newEvents[eventName] = events[eventName].filter((eventCallback) => {
    return callback !== eventCallback;
  });

  return newEvents;
};

const updateEvents = (
  events: Record<EventNames, Callback<Data>[]>,
  eventName: EventNames,
  callback: Callback<Data>,
) => {
  const newEvents = { ...events };

  if (typeof newEvents[eventName] === 'undefined') {
    newEvents[eventName] = [];
  }

  const callbacks = [...newEvents[eventName], callback];

  newEvents[eventName] = callbacks;

  return newEvents;
};

class EventEmitter {
  private events: Record<EventNames, Callback<Data>[]> = {} as Record<
    EventNames,
    Callback<Data>[]
  >;

  public subscribe(eventName: EventNames, callback: Callback<Data>): void {
    this.events = updateEvents(this.events, eventName, callback);
  }

  public unsubscribe(eventObjectWithCallback: EventObjectWithCallback): void {
    this.events = removeEvents(this.events, eventObjectWithCallback);
  }

  public emit(eventObject: EventObject): void {
    emitEvents(this.events, eventObject);
  }
}

export default EventEmitter;
