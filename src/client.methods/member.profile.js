import Helper from '../helper/helper';

const METHOD = 'GET';
const PATH = '/api/members';
const ERROR_MESSAGE = 'You must provide a member ID.';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

export default function () {

  let args = Array.prototype.slice.call(arguments); // arguments to array
  let callback = Helper.getCallback(args);

  if (!callback) {
    return this.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  let memberId = Helper.getMemberId.call(this, args);

  if (!memberId) {
    return this.handleError(ERROR_MESSAGE, callback);
  }

  return this.baseRequest({
    method: METHOD,
    path: `${PATH}/${memberId}`,
  }, callback);

}
