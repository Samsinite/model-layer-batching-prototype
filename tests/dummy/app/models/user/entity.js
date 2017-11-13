import Entity from 'model-layer-batching/entity';

export default Entity('User', {
  username: Entity.STRING.isRequired,

  firstName: Entity.STRING({
    default() {
      return 'Foo';
    }
  }),

  lastName: Entity.STRING({
    default() {
      return 'Bar';
    }
  })
});
