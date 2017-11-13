import Repository from 'model-layer-batching/repository';

import { Entity as UserEntity } from '../user/index';

export default Repository({
  associations: {
    author: Repository.belongsTo(UserEntity, { foreignKey: 'authorId' }),
  },

  actions: {
  },
});

