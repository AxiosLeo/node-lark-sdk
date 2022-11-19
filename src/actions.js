'use strict';

const Model = require('./model');

class Action extends Model {
  constructor(tag) {
    super({
      tag
    });
  }
}

class ButtonAction extends Action {
  constructor({ text, type = 'default', url, multi_url, value, confirm }) {
    super({
      tag: 'button',
      text: {
        tag: 'plain_text',
        content: text
      },
      type,
      url, multi_url, value, confirm
    });
  }
}

class SelectOptionsAction extends Action {
  constructor({ placeholder, options, initial_option, confirm }) {
    super({
      tag: 'select_static',
      placeholder: {
        tag: 'plain_text',
        content: placeholder
      },
      options,
      initial_option,
      confirm
    });
  }
}

module.exports = {
  Action,
  ButtonAction,
  SelectOptionsAction
};
