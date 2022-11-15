'use strict';

const Validator = require('validatorjs');

const validate = (obj, rules = {}) => {
  let validation = new Validator(obj, rules);
  validation.check();
  if (validation.fails()) {
    return validation.errors.all();
  }
  return [];
};

module.exports = {
  validate
};
