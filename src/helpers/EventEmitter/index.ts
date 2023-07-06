class EventEmitter<T> {
  private events: {
    [eventName in keyof T]?: ((value: T[eventName]) => void)[];
  } = {};

  public subscribe<K extends keyof T>(
    eventName: K,
    callback: (value: T[K]) => void,
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
    callback: (value: T[K]) => void,
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
