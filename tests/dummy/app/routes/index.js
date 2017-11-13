import Route from '@ember/routing/route';
import { Entity as UserEntity } from '../user/index';

export default Route.extend({
  model() {
    return new UserEntity({ username: 'Test!', firstName: 'Sam' });
  }
});
