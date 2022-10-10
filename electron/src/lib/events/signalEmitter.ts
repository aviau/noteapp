import { EventEmitter } from 'events';

// Like EventEmitter, but only for a single signal. No payload.
export class SignalEmitter {
  private readonly EVENT_NAME = 'signal';

  private readonly eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  on(callback: () => void): void {
    this.eventEmitter.on(this.EVENT_NAME, callback);
  }

  once(callback: () => void): void {
    this.eventEmitter.once(this.EVENT_NAME, callback);
  }

  emit(): void {
    this.eventEmitter.emit(this.EVENT_NAME);
  }
}
