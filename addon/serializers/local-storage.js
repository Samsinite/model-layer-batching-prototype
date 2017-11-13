import BaseSerializer from './base';

export default class LocalStorageSerializer extends BaseSerializer {
  normalizeRecord(json) {
    return json;
  }
}
