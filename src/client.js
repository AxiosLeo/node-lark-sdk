'use strict';

const { default: axios } = require('axios');
// eslint-disable-next-line no-unused-vars
const Model = require('./model');

class LarkClient {
  constructor({ app_id, app_secret }) {
    this.app_id = app_id;
    this.app_secret = app_secret;
    this.access_token = null;
    this.expire = 0;
  }

  async token() {
    const now = (new Date()).valueOf();
    if (this.expire > now) {
      return this.access_token;
    }
    const res = await axios.post('https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal', {
      app_id: this.app_id,
      app_secret: this.app_secret,
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    });
    this.expire = (new Date()).valueOf() + res.data.expire * (900);
    this.access_token = {
      app: res.data.app_access_token,
      tenant: res.data.tenant_access_token,
    };
    return this.access_token;
  }

  /**
   * 
   * @param {*} receive_id 
   * @param {*} receive_id_type 
   * @param {Model} card_message_model 
   * @returns 
   */
  async sendCardMessage(card_message_model, receive_id, receive_id_type = 'chat_id') {
    return await this.request(`https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receive_id_type}`, {
      receive_id,
      msg_type: 'interactive',
      content: card_message_model.toJson()
    });
  }

  /**
   * @param {*} url 
   * @param {*} data 
   * @returns 
   */
  async request(url, data) {
    const token = await this.token();
    return await axios.post(url, data, {
      'Authorization': `Bearer ${token.app}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
  }
}

module.exports = LarkClient;
