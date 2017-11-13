import { UnimplementedError } from './entity';

function buildActions(repository, actions) {
  throw new UnimplementedError();
}

function buildAssociations(repository, associations) {
  throw new UnimplementedError();
}

const schema = function Schema(schema) {
  return class Repository {
    constructor(store, adapter, serializer, entityClass) {
      this.store = store;
      this.adapter = adapter;
      this.serializer = serializer;
      this.entityClass = entityClass;
    }

    new(data) {
      return new this.entityClass(this, data);
    }

    create(entity) {
      return this.adapter.create(entity).then((json) => {
        const { primaryKey, data } = this.serializer.normalizeRecord(json);
        const EntityClass = this.entityClass;

        return new EntityClass(this, data, primaryKey);
      });
    }

    update(entity) {
      return this.adapter.update(entity).then((json) => {
        const { primaryKey, data } = this.serializer.normalizeRecord(json);

        entity.reload(data);

        return entity;
      });
    }

    find(id) {
      return this.adapter.find(id).then((json) => {
        const { primaryKey, data } = this.serializer.normalizeRecord(json);
        const EntityClass = this.entityClass;

        return new EntityClass(this, data, primaryKey);
      });
    }

    fetch(params) {
      return this.adapter.fetch(params).then((json) => {
        this.serializer.normalizeQuery(json).map((record) => {
          const { primaryKey, data } = record;
          const EntityClass = this.entityClass;

          const entity =  new EntityClass(this, data, primaryKey);

          this.push(entity);
          return entity;
        });
      });
    }

    /* pushes an entity into the local store without calling the adapter */
    push(entity) {
      const schema = EntityClass.Schema;

      Ember.assert('Entity must have a foreign key to be pushed into the local store', entity.primaryKey);
      const primaryKey = entity.primaryKey;

      throw new UnimplementedError();
    }


    /* returns an entity loaded from the local store */
    localFind(id) {
      throw new UnimplementedError();
    }

    /* returns all entities loaded from the local store */
    localCollection() {
      throw new UnimplementedError();
    }
  }
}

schema.belongsTo = () => {
};

schema.hasMany = () => {
};

export default schema;
