'use strict';

const Model = require('./model');

class Field extends Model {
  constructor(content, tag, is_short = false) {
    super({
      is_short,
      text: {
        tag,
        content
      }
    });
  }
}

class PlainTextField extends Field {
  constructor(content, is_short = false) {
    super(content, 'plain_text', is_short);
  }
}

class MarkdownField extends Field {
  constructor(content, is_short = false) {
    super(content, 'lark_md', is_short);
  }
}

module.exports = {
  Field,
  PlainTextField,
  MarkdownField
};
