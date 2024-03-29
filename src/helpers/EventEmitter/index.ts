type Callback<T extends Record<string, unknown>, K extends keyof T> = (
  value: T[K],
) => void;

class EventEmitter<T extends Record<string, unknown>> {
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
    this.events[eventName] = this.events[eventName]?.filter((el) => {
      return callback !== el;
    });
  }

  public emit<K extends keyof T>(eventName: K, value: T[K]): void {
    this.events[eventName]?.forEach((el) => {
      return el(value);
    });
  }
}

export { EventEmitter, Callback };
