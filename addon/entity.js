
const TYPES = {
  STRING: 'STRING',
  NUMERIC: 'NUMERIC',
  OBJECT: 'OBJECT',
  DATE: 'DATE'
};

const defaultFunctions = {
  default() {
    return null;
  }
};

const defaultAttributes = {
  required: false
};

class DefinitionError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
  }
}

export class UnimplementedError extends Error {
  constructor() {
    super('Not implemented');
  }
}

function propertyDefinition(type, options) {
  /**
   * loop through all default descriptor functions and error if
   * they are incorrectly defined
  **/
  Object.keys(defaultFunctions).forEach((name) => {
    if (options[name] && !(typeof(options[name]) === "function")) {
      throw DefinitionError(type, '`${name}` property definition option must be a function');
    }
  });

  return {
    type,
    options: Object.assign({}, defaultFunctions, defaultAttributes, options)
  };
}

function createDefaultData(schema) {
  return Object.keys(schema).reduce((data, key) => {
    data[key] = schema[key].options.default();

    return data;
  }, {});
}

export default function Schema(name, schema) {
  const entity = class Entity {
    constructor(repository, data = {}, primaryKey) {
      this.repository = repository;
      this.primaryKey = primaryKey;
      this.data = Object.assign(createDefaultData(schema), data);
    }

    get(key) {
      return this.data[key];
    }

    set(key, value) {
      return this.data[key] = value;
    }

    reload(data) {
      this.data = data;
    }

    save() {
      if (this.primaryKey) {
        return this.repository.update(this);
      } else {
        return this.repository.create(this);
      }
    }
  }
  entity.Schema = schema;
  entity.EntityName = name;
  entity.prototype.class = () => entity;

  return entity;
}

// Create schema types (I.E. Schema.string)
Object.keys(TYPES).forEach((type) => {
  Schema[type] = (options = {}) => {
    return propertyDefinition(type, options);
  };

  Schema[type].isRequired = propertyDefinition(type, { required: true });
});
