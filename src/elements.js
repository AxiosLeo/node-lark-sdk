'use strict';

const { validate } = require('./helper');

class Element {
  constructor(tag) {
    this.element = {
      tag,
    };
  }
}

class PlainTextElement extends Element {
  constructor(content, fields = [], extra = {}) {
    super('div');
    this.element.text = {
      tag: 'plain_text',
      content,
      ...extra
    };
    this.element.fields = fields;
  }
}

class MarkdownElement extends Element {
  constructor(content, href) {
    super('markdown');
    this.element.content = content;
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
      this.element.href = {
        urlVal: href
      };
    }
  }
}

class HrElement extends Element {
  constructor() {
    super('hr');
  }
}

class ImageElement extends Element {
  constructor({ title = '', img_key, mode = 'crop_center', preview = false, alt = '', custom_width, compact_width }) {
    super('img');
    this.element.title = {
      tag: 'plain_text',
      content: title
    };
    this.element.img_key = img_key;
    this.element.mode = mode === 'fit_horizontal' ? mode : 'crop_center';
    this.element.preview = preview;
    if (custom_width) {
      this.element.custom_width = custom_width;
    }
    if (compact_width) {
      this.element.compact_width = compact_width;
    }
    if (alt) {
      this.element.alt = {
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
  constructor(actions) {
    super('action');
    this.element.actions = actions;
  }
}

module.exports = {
  PlainTextElement,
  MarkdownElement,
  HrElement,
  ImageElement,
  NoteElement,
  ActionElement
};
