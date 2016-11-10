let assign = require('lodash.assign');
import Helper from '../helper/helper';

const METHOD = 'POST';
const PATH = '/api/gamification/actions/identify-member';
const ERROR_MESSAGE = 'You must provide either a member ID or an external ID.';

export default function (options, callback) {

  options = options || {};

  if (!Helper.hasOneOfRequiredProperties(['member_id', 'external_id'], options)) {
    this.handleError(ERROR_MESSAGE, callback);
  }

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
