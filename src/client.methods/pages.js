'use strict';

import Helper from '../helper/helper';

const METHOD = 'GET';
const PATH = '/api/content/pages';
const ERROR_MESSAGE = 'You must provide a page ID.';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

export default function (options, callback) {

  if (!callback || typeof callback !== 'function') {
    return this.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  options = options || {};

  if (!Helper.hasRequiredProperties('pageId', options)) {
    return this.handleError(ERROR_MESSAGE, callback);
  }

  let memberId = Helper.getMemberId.call(this, [options]);
  let queryParams = '';

  if (memberId) {
    queryParams = Helper.getQueryParams(memberId);
  }

  return this.baseRequest({
    method: METHOD,
    path: `${PATH}/${options.pageId}${queryParams}`,
  }, callback);

}
