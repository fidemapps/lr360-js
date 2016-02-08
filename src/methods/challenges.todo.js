const METHOD = 'GET';
const PATH_1 = '/api/members/';
const PATH_2 = '/challenges/todo';
const ERROR_MESSAGE = 'You must provide a member ID.';

export default function (options, callback) {

  options = options || {};
  if (!hasRequiredProperty(options)) {
    if (callback && typeof callback === 'function') {
      return callback(new Error(ERROR_MESSAGE));
    }

    throw new Error(ERROR_MESSAGE);
  }

  return this.baseRequest({
    method: METHOD,
    path: `${PATH_1}${options.memberId}${PATH_2}`,
  }, callback);

}

function hasRequiredProperty(options) {
  return !!options.memberId;
}
