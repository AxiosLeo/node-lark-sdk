'use strict';

// eslint-disable-next-line no-unused-vars
const { Action } = require('./actions');
// eslint-disable-next-line no-unused-vars
const { Field } = require('./fields');
const { validate } = require('./helper');
const Model = require('./model');

class Element extends Model {
  constructor(obj = {}) {
    if (!obj.tag) {
      throw new Error('Element tag is required');
    }
    super(obj);
  }
}

class PlainTextElement extends Element {
  /**
   * @param {string} content 
   * @param {Field[]} fields
   */
  constructor(content, fields = [], lines = undefined) {
    super({
      tag: 'div',
      text: {
        tag: 'plain_text',
        content,
        lines,
      },
      fields,
    });
  }
}

class MarkdownElement extends Element {
  constructor(content, href) {
    super({
      tag: 'markdown',
      content
    });
    if (href) {
      const errors = validate(href, {
        'url': 'required|string',
        'android_url': 'required|string',
        'ios_url': 'required|string',
        'pc_url': 'required|string',
      });
      if (errors.length > 0) {
        throw new Error('Invalid href');
      }
      this.href = {
        urlVal: href
      };
    }
  }
}

class HrElement extends Element {
  constructor() {
    super({
      tag: 'hr'
    });
  }
}

class ImageElement extends Element {
  constructor({
    title = '',
    img_key,
    mode = 'crop_center',
    preview = false,
    alt = '',
    custom_width,
    compact_width
  }) {
    super({
      tag: 'img',
      title: {
        tag: 'plain_text',
        content: title
      },
      img_key,
      mode: mode === 'fit_horizontal' ? mode : 'crop_center',
      preview
    });

    if (custom_width) {
      this.custom_width = custom_width;
    }
    if (compact_width) {
      this.compact_width = compact_width;
    }
    if (alt) {
      this.alt = {
        tag: 'plain_text',
        content: alt
      };
    }
  }
}

class NoteElement extends Element {
  /**
   * 
   * @param {Element[]} elements 
   */
  constructor(elements) {
    super('note');
    this.element.elements = elements;
  }
}

class ActionElement extends Element {
  /**
   * @param {Action[]} actions 
   */
  constructor(actions = []) {
    super({
      tag: 'action',
      actions
    });
  }
}

module.exports = {
  Element,
  PlainTextElement,
  MarkdownElement,
  HrElement,
  ImageElement,
  NoteElement,
  ActionElement
};
