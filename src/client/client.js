let assign = require('lodash.assign');
import { clientMethods } from '../methods/index';

const HOSTNAME = 'services.fidemapps.com';

export default class Client {

  constructor() {

    this.config = {
      hostname: HOSTNAME,
      port: 80,
      protocol: 'http',
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
