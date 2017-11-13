import { NeedsImplementedError } from '../utils';

function raiseError(methodName) {
  throw new NeedsImplementedError('Adapter', methodName);
}

export default class Adapter {
  constructor(entityClass) {
    this.entityClass = entityClass;
  }

  find(/*id*/) {
    raiseError('find');
  }

  fetch(/*params*/) {
    raiseError('fetch');
  }

  create(/*entity*/) {
    raiseError('create');
  }

  update(/*entity*/) {
    raiseError('update');
  }

  destroy(/*entity*/) {
    raiseError('destroy');
  }
}
