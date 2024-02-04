import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';

export class Collection<T, K> {
  moldels: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public desrialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.moldels.push(this.desrialize(value));
      });
      this.trigger('change');
    });
  }
}
