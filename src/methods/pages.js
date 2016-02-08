const METHOD = 'GET';
const PATH = '/api/content/pages';
const ERROR_MESSAGE = 'You must provide a page ID.';

export default function (options, callback) {

  options = options || {};

  if (!hasRequiredProperty(options)) {
    if (callback && typeof callback === 'function') {
      return callback(new Error(ERROR_MESSAGE));
    }

    throw new Error(ERROR_MESSAGE);
  }

  let queryParams = getQueryParams(options);

  return this.baseRequest({
    method: METHOD,
    path: `${PATH}/${options.pageId}${queryParams}`,
  }, callback);

}

function hasRequiredProperty(options) {
  return !!options.pageId;
}

function getQueryParams(options) {
  let qs = '';

  if (options.memberId) {
    qs = `?member_id=${options.memberId}`;
  }

  return qs;
}
