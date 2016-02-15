let assign = require('lodash.assign');
import Helper from '../helper/helper';

const METHOD = 'POST';
const PATH = '/api/gamification/actions/identify-member';
const ERROR_MESSAGE = 'You must provide either a member ID, an external ID or an email.';

export default function (options, callback) {

  options = options || {};

  if (!Helper.hasOneOfRequiredProperties(['memberId', 'externalId', 'email'], options)) {
    this.handleError(ERROR_MESSAGE, callback);
  }

  options = formatExternalIdParameter(options);

  // gets member id returned and sets it in the client context
  let callbackInterceptor = (error, response) => {
    if (response && response.data && response.data.id) {
      this.memberId = response.data.id;
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

function formatExternalIdParameter(options) {
  if (options.externalId) {
    return assign({}, options, {external_id: options.externalId}); // jscs:disable
  }
  return options;
}
