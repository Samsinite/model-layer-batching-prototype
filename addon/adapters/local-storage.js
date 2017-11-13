import Ember from 'ember';
import { v4 } from 'uuid';

import BaseAdapter from './base';

class NotFoundError extends Error {
  constructor(entityClass, key) {
    super(`Entity type ${entityClass.EntityName}, key ${key} is not found in the local storage`);
  }
}

export default class LocalStorageAdapter extends BaseAdapter {
  create(entity) {
    const schema = this.entityClass.Schema;

    const primaryKey = v4();
    const entityName = this.entityClass.EntityName;
    const keyName = `${entityName}-${primaryKey}`;
    entity.primaryKey = primaryKey;


    return new Promise((resolve) => {
      localStorage.setItem(keyName, JSON.stringify(entity.data));
      resolve({ primaryKey: entity.primaryKey, data: entity.data });
    });
  }

  update(entity) {
    const entityName = this.entityClass.EntityName;
    const primaryKey = entity.primaryKey;
    const keyName = `${entityName}-${primaryKey}`;

    return new Promise((resolve) => {
      localStorage.setItem(keyName, JSON.stringify(entity.data));
      resolve({ primaryKey: entity.primaryKey, data: entity.data });
    });
  }

  find(id) {
    const entityName = this.entityClass.EntityName;
    const keyName = `${entityName}-${id}`;
    const data = JSON.parse(localStorage.getItem(keyName));

    return new Promise((resolve, reject) => {
      if (data) {
        resolve({ primaryKey: id, data });
      } else {
        reject(new NotFoundError());
      }
    });
  }
}
