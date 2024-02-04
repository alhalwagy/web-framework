import { User } from './models/User';

const user = new User({
  id: 'bff3',
  name: 'newwwwwwwwwwwwwwwwwwwww',
  age: 15465,
});

user.on('save', () => {
  console.log(user);
});

user.save();
