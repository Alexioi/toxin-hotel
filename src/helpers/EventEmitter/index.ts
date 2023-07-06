class EventEmitter<T> {
  private events: {
    [eventName in keyof T]?: ((value: T[eventName]) => void)[];
  } = {};

  public subscribe<K extends keyof T>(
    eventName: K,
    callback: (value: T[K]) => void,
  ): void {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = [callback];
    }

    this.events[eventName]?.push(callback);
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
