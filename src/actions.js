'use strict';

class Action {
  constructor(tag) {
    this.action = {
      tag
    };
  }
}

class ButtonAction extends Action {
  constructor({ text, type = 'default', url, multi_url, value, confirm }) {
    super('button');
    this.action.text = {
      tag: 'plain_text',
      content: text
    };
    this.action.type = type;
    Object.assign(this.action, {
      url, multi_url, value, confirm
    });
  }
}

class SelectOptionsAction extends Action {
  constructor({ placeholder, options, initial_option, confirm, value }) {
    super('select_static');
    this.action.placeholder = {
      tag: 'plain_text',
      content: placeholder
    };
    this.action.options = options;
    Object.assign(this.action, {
      initial_option, confirm
    });
  }
}

module.exports = {
  ButtonAction,
  SelectOptionsAction
};
