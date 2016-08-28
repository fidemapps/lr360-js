'use strict';

import Helper from '../helper/helper';

const METHOD = 'GET';
const PATH = '/api/content/menus';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

export default function () {

  let args = Array.prototype.slice.call(arguments); // arguments to array
  let callback = Helper.getCallback(args);

  if (!callback) {
    return this.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  let memberId = Helper.getMemberId.call(this, args);
  let queryParams = '';

  if (memberId) {
    queryParams = Helper.getQueryParams(memberId);
  }

  return this.baseRequest({
    method: METHOD,
    path: `${PATH}${queryParams}`,
  }, callback);

}
