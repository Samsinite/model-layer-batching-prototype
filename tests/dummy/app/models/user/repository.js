import Repository from 'model-layer-batching/repository';

import { Entity as PostEntity } from '../post/index';

export default Repository({
  associations: {
    posts: Repository.hasMany(PostEntity, { foreignKey: 'authorId' }),
  },

  actions: {
  },
});
