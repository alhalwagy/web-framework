import axios, { AxiosResponse } from 'axios';

interface UserProbs {
  id?: string;
  name?: string;
  age?: number;
}

export class User {
  constructor(private data: UserProbs) {}

  get(probUser: string): string | number {
    return this.data[probUser];
  }
  set(update: UserProbs): void {
    Object.assign(this.data, update);
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse) => {
        this.set(response.data);
      });
  }
  save(): void {
    const id = this.get('id');
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}
