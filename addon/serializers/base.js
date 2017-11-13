import NeedsImplementedError from '../utils';

function raiseError(methodName) {
  throw new NeedsImplementedError('Serializer', methodName);
}

export default class Serializer {
  constructor(entityClass) {
    this.entityClass = entityClass;
  }

  normalizeRecord(/*json*/) {
    raiseError('normalizeRecord');
  }

  normalizeQuery(/*json*/) {
    raiseError('normalizeQuery');
  }

  serializerRecord(/*json*/) {
    raiseError('serializerRecord');
  }
}
