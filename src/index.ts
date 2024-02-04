import { User } from './models/User';

const user = User.buildUser({ id: 'bff3' });

user.on('change', () => {
  console.log(user);
});

user.fetch();
