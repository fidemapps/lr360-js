let assign = require('lodash.assign');

const METHOD = 'POST';
const PATH = '/api/gamification/actions/identify-member';
const ERROR_MESSAGE = 'You must provide either a member ID, an external ID or an email.';

export default function (options, callback) {

  options = options || {};

  if (!hasOneOfRequiredProperties(options)) {
    if (callback && typeof callback === 'function') {
      return callback(new Error(ERROR_MESSAGE));
    }

    throw new Error(ERROR_MESSAGE);
  }

  options = formatExternalIdParameter(options);

  return this.baseRequest({
    method: METHOD,
    body: options,
    path: PATH,
  }, callback);

}

function hasOneOfRequiredProperties(options) {
  return !!options.memberId || !!options.email || !!options.externalId;
}

function formatExternalIdParameter(options) {
  if (options.externalId) {
    return assign({}, options, {external_id: options.externalId}); // jscs:disable
  }
  return options;
}
