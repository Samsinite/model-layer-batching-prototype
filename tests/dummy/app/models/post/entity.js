import Entity from 'model-layer-batching/entity';

export default Entity('Post', {
  /* foreign keys */
  authorId: Entity.STRING.isRequired,

  /* attributes */
  title: Entity.STRING.isRequired,
  body: Entity.STRING.isRequired,
});
