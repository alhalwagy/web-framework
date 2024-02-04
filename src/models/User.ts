import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Atributes } from './Attribute';
export interface UserProbs {
  id?: string;
  name?: string;
  age?: number;
}
const rootUrl = 'http://localhost:3000/users';
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProbs> = new Sync<UserProbs>(rootUrl);
  public atributes: Atributes<UserProbs>;

  constructor(attrs: UserProbs) {
    this.atributes = new Atributes<UserProbs>(attrs);
  }
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.atributes.get;
  }
  set(update: UserProbs): void {
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
