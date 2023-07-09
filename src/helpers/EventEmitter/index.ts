type Callback<T extends object, K extends keyof T> = (value: T[K]) => void;

class EventEmitter<T extends object> {
  private events: {
    [eventName in keyof T]?: Callback<T, eventName>[];
  } = {};

  public subscribe<K extends keyof T>(
    eventName: K,
    callback: Callback<T, K>,
  ): void {
    const events = this.events[eventName];

    if (events !== undefined) {
      this.events[eventName] = [...events, callback];

      return;
    }

    this.events[eventName] = [callback];
  }

  public unsubscribe<K extends keyof T>(
    eventName: K,
    callback: Callback<T, K>,
  ): void {
    this.events[eventName] = this.events[eventName]?.filter((eventCallback) => {
      return callback !== eventCallback;
    });
  }

  public emit<K extends keyof T>(eventName: K, value: T[K]): void {
    this.events[eventName]?.forEach((name) => {
      return name(value);
    });
  }
}

export default EventEmitter;
