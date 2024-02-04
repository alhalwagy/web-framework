import { UserForm } from './views/UserForm';
import { User } from './models/User';

const user = User.buildUser({ name: 'Ahmed', age: 29 });

const rootElement = document.getElementById('root');
if (rootElement) {
  const userForm = new UserForm(rootElement, user);
  userForm.render();
} else {
  console.error("Element with ID 'root' not found.");
}
