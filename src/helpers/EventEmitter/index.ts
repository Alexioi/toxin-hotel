import { EventObject, EventObjectWithCallback } from './types';

const emitEvents = (
  events: { [key: string]: ((args: any) => void)[] },
  { eventName, eventArguments }: EventObject,
) => {
  if (events[eventName] !== null) {
    events[eventName].forEach((callback) => {
      callback.call(null, eventArguments);
    });
  }
};

const removeEvents = (
  events: { [key: string]: ((args: any) => void)[] },
  { eventName, callback }: EventObjectWithCallback,
) => {
  const newEvents = { ...events };
  newEvents[eventName] = events[eventName].filter((eventCallback) => {
    return callback !== eventCallback;
  });

  return newEvents;
};

const updateEvents = (
  events: { [key: string]: ((args: any) => void)[] },
  { eventName, callback }: EventObjectWithCallback,
) => {
  const newEvents = { ...events };

  if (typeof newEvents[eventName] === 'undefined') {
    newEvents[eventName] = [];
  }

  newEvents[eventName].push(callback);

  return newEvents;
};

class EventEmitter {
  private events: { [key: string]: ((args: any) => void)[] } = {};

  public subscribe(eventObjectWithCallback: EventObjectWithCallback): void {
    this.events = updateEvents(this.events, eventObjectWithCallback);
  }

  public unsubscribe(eventObjectWithCallback: EventObjectWithCallback): void {
    this.events = removeEvents(this.events, eventObjectWithCallback);
  }

  public emit(eventObject: EventObject): void {
    emitEvents(this.events, eventObject);
  }
}

export default EventEmitter;
