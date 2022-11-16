'use strict';

const Validator = require('validatorjs');

class Model {
  constructor(obj) {
    if (typeof obj !== 'undefined' && obj !== null) {
      Object.assign(this, obj);
    }
  }

  toJson() {
    return JSON.stringify(this);
  }

  properties() {
    return Object.keys(this);
  }

  count() {
    return this.properties().length;
  }

  validate(rules, msg = {}) {
    const validation = new Validator(this, rules, msg);
    if (validation.fails()) {
      const errors = validation.errors.all();
      const keys = Object.keys(errors);
      throw new Error(errors[keys[0]][0]);
    }
    validation.check();
    return validation;
  }
}

module.exports = Model;
