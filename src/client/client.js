'use strict';

let assign = require('lodash.assign');
import {clientMethods} from '../client.methods/index';

const HOSTNAME = 'api.lr360.io';

export default class Client {

  constructor() {

    this.config = {
      hostname: HOSTNAME,
      port: 443,
      protocol: 'https',
      geolocation: true,
      dev: false,
    };

    this.memberId = null;

  }

  handleError(message, callback) {

    message = message || 'N/A';
    let error;

    if (typeof message === 'string') {
      error = new Error(message);
    } else {
      error = message;
    }

    if (callback && typeof callback === 'string') {
      return callback(error);
    }

    if (!this.config.dev && console) {
      return console.error(error.message);
    }

    throw error;

  }

}

assign(Client.prototype, clientMethods);
