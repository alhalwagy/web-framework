import { Collection } from './models/Collection';
import { User, UserProbs } from './models/User';

const collection = User.buildUserCollection();

collection.on('change', () => {
  console.log(collection);
});

collection.fetch();
