import LocalStorageSerializer from 'model-layer-batching/serializers/local-storage';
import LocalStorageAdapter from 'model-layer-batching/adapters/local-storage';

export class NeedsImplementedError extends Error {
  constructor(baseClassName, methodName) {
    super(`classes extending from '${baseClassName}' must implement '${methodName}'`);
  }
}

export function buildDefaultRepositoryLoader(store, defaultAdapterClass, defaultSerializerClass) {
  return function repositoryLoader(module) {
    const adapterClass = module.Adapter || defaultAdapterClass;
    const serializerClass = module.Serializer || defaultSerializerClass;

    return new module.Repository(
      store,
      new adapterClass(module.Entity),
      new serializerClass(module.Entity),
      module.Entity
    );
  }
}

export const LocalStorageRepository = buildDefaultRepositoryLoader(
  undefined,
  LocalStorageAdapter,
  LocalStorageSerializer
);
