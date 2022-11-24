'use strict';

// eslint-disable-next-line no-unused-vars
const { Element } = require('./elements');
const Model = require('./model');

class MessageConfig extends Model {
  constructor(obj) {
    super({
      wide_screen_mode: true,
      update_multi: true,
      ...obj
    });
  }
}

class MessageHeaderTitle extends Model {
  constructor(title = '') {
    super({
      tag: 'plain_text',
      content: title,
    });
  }
}

class MessageHeader extends Model {
  constructor(title = '') {
    super({
      title: new MessageHeaderTitle(title)
    });
  }
}

class Message extends Model { }

class CardMessage extends Message {
  constructor(options = {}) {
    const { elements = [], title = '', config = null } = options;
    super({
      config: config || new MessageConfig(),
      elements
    });
    this.config = config || new MessageConfig();
    if (title) {
      this.header = new MessageHeader(title);
    }
  }

  /**
   * 
   * @param {Element} element 
   */
  addElement(element) {
    this.elements.push(element);
    return;
  }
}

module.exports = {
  CardMessage
};
