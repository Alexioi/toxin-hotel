import { EventObject, EventObjectWithCallback } from './types';

class EventEmitter {
  private events: { [key: string]: ((args: any) => void)[] } = {};

  public subscribe({ eventName, callback }: EventObjectWithCallback): void {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  public unsubscribe({ eventName, callback }: EventObjectWithCallback): void {
    this.events[eventName] = this.events[eventName].filter((eventCallback) => {
      return callback !== eventCallback;
    });
  }

  public emit({ eventName, eventArguments }: EventObject): void {
    const event = this.events[eventName];

    if (event !== null) {
      event.forEach((callback) => {
        return callback.call(null, eventArguments);
      });
    }
  }
}

export default EventEmitter;
