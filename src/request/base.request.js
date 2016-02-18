import Helper from '../helper/helper';
var superagent = require('superagent');
import RequestError from '../client.methods/request.error.js';
let assign = require('lodash.assign');
let merge = require('lodash.merge');

const ERROR_MESSAGE = 'You must provide a key and a path.';

export function baseRequest(options, callback) {

  options = options || {};

  if (!Helper.hasRequiredProperties('key', this.config) || !Helper.hasRequiredProperties('path', options)) {
    return this.handleError(ERROR_MESSAGE, callback);
  }

  return addGeolocation(options, (options) => {

    let method = options.method.toLowerCase();
    let url = formatUrl(assign({}, options, this.config));

    let request = superagent[method](url)
      .set('X-Fidem-AccessApiKey', this.config.key || null)
      .set('Accept', 'application/json');

    if (['post', 'put'].indexOf(method) !== -1) {
      request.set('Content-Type', 'application/json');
    }

    request
      .withCredentials()
      .send((options && options.body && JSON.stringify(options.body)) || null)
      .end((err, res) => {

        let requestError;
        if (res && res.statusCode >= 299) {
          requestError = new RequestError(res.body, res.statusCode);
        }

        if (callback && typeof callback === 'function') {

          let callbackError = err || requestError || null;
          return callback(callbackError, res);

        } else {

          if (err || requestError) {
            return this.handleError(err || requestError, callback);
          }

        }

      });

  });

}

export function addGeolocation(options, callback) {

  function success(position) {
    let coordinates = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    callback(merge({}, options, { body: { coordinates: coordinates } }));
  }

  function error() {
    callback(merge({}, options, { body: { coordinates: null } }));
  }

  // don't change anything if request method is not POST or PUT
  // or if request path if not for trackAction (/api/gamification/actions)
  if (!options.method || ['put', 'post'].indexOf(options.method.toLowerCase()) === -1 || options.path !== '/api/gamification/actions') {

    return callback(options);

  }

  if (!window.navigator || !window.navigator.geolocation) {
    error();
  }  else {
    window.navigator.geolocation.getCurrentPosition(success, error);
  }

}

function formatUrl(url) {
  let path = url.path || '';
  return `${url.protocol}://${url.hostname}:${url.port}${path}`;
}
