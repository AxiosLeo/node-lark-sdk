'use strict';

const expect = require('chai').expect;
const { MarkdownElement } = require('../src/elements');
const { CardMessage } = require('../src/message');

describe('card message test case', () => {
  it('should be ok', () => {
    const card = new CardMessage();
    expect(card.toJson()).to.be.equal(JSON.stringify({
      'config': {
        'wide_screen_mode': true,
        'update_multi': true
      },
      'elements': []
    }));

    card.addElement(new MarkdownElement('markdown test content'));
    expect(card.toJson()).to.be.equal(JSON.stringify({
      'config': {
        'wide_screen_mode': true,
        'update_multi': true
      },
      'elements': [{
        'tag': 'markdown',
        'content': 'markdown test conent'
      }]
    }));
  });
});
