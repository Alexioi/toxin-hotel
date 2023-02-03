import { EventNames, EventObject } from './types';

class EventEmitter {
  private events: {
    [key: string]: ((args: any) => void)[];
  };

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: EventNames, callback: (args: any) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  public unsubscribe(
    eventName: EventNames,
    callback: (args: any) => void,
  ): void {
    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => callback !== eventCallback,
    );
  }

  public emit({ eventName, eventArguments }: EventObject): void {
    const event = this.events[eventName];

    if (event) {
      event.forEach((callback) => callback.call(null, eventArguments));
    }
  }
}

export default EventEmitter;
