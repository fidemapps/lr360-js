let assign = require('lodash.assign');

const METHOD = 'POST';
const PATH = '/api/gamification/actions/identify-member';

export default function (options, callback) {

  options = options || {};

  // gets member id returned and sets it in the client context
  let callbackInterceptor = (error, response) => {
    if (response && response.body && response.body.data && response.body.data.id) {
      this.memberId = response.body.data.id;
    }

    if (callback && typeof callback === 'function') {
      return callback(error, response);
    }

  };

  return this.baseRequest({
    method: METHOD,
    body: options,
    path: PATH,
  }, callbackInterceptor);

}
