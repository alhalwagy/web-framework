import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Atributes } from './Attribute';
import { Eventing } from './Eventing';
export interface UserProbs {
  id?: string;
  name?: string;
  age?: number;
}
const rootUrl = 'http://localhost:3000/users';
export class User extends Model<UserProbs> {
  static buildUser(attrs: UserProbs): User {
    return new User(
      new Atributes<UserProbs>(attrs),
      new Eventing(),
      new ApiSync<UserProbs>(rootUrl)
    );
  }
}
