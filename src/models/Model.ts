import { AxiosPromise, AxiosResponse } from 'axios';

type Callback = () => void;

export interface HasId {
  id?: string;
}

interface ModelAtributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: string): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callbackL: Callback): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasId> {
  constructor(
    private atributes: ModelAtributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.atributes.get;

  set(update: T): void {
    this.atributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.atributes.get('id');
    if (typeof id !== 'string') {
      throw new Error('Id Not found. 404');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }
  save(): void {
    const data = this.atributes.getAll();
    this.sync
      .save(data)
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
