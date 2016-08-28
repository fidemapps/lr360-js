'use strict';

import Helper from '../helper/helper';

const METHOD = 'GET';
const PATH_1 = '/api/members/';
const PATH_2 = '/challenges/done';
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
    path: `${PATH_1}${memberId}${PATH_2}`,
  }, callback);

}
