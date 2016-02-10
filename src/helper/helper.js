let assign = require('lodash.assign');

export default class Helper {

  static getCallback(args) {
    let callback = null;

    if (args && args.length && args.length !== 0 && typeof args[args.length - 1] === 'function') {
      callback = args[args.length - 1];
    }

    return callback;
  }

  static hasRequiredProperties(properties, options) {

    if (typeof properties === 'string') {
      properties = [properties];
    }

    return properties.every(property => {
      return !!options[property];
    });

  }

  static hasOneOfRequiredProperties(properties, options) {

    return properties.some(property => {
      return !!options[property];
    });

  }

  static getMemberId(args) {

    let memberId = this.memberId || null;

    if (args && args[0] && typeof args[0] === 'object') {
      memberId = args[0].memberId || memberId;
    }

    return memberId;

  }

  static getDeviceId(args) {

    let deviceId = 'me';

    if (args && args[0] && typeof args[0] === 'object') {
      deviceId = args[0].deviceId || deviceId;
    }

    return deviceId;

  }

  static getQueryParams(memberId) {
    let qs = '';

    if (memberId && (typeof memberId === 'string' || typeof memberId === 'number')) {
      qs = `?member_id=${memberId}`;
    }

    return qs;
  }

}
