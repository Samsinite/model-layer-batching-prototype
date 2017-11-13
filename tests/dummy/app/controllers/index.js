import Ember from 'ember';
import { LocalStorageRepository } from 'model-layer-batching/utils';
import * as UserModule from '../user/index';

const userRepository = LocalStorageRepository(UserModule);

export default Ember.Controller.extend({
  userRepository,
});
