const METHOD = 'GET';
const PATH = '/api/content/newslists';
const ERROR_MESSAGE = 'You must provide a news list ID.';

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
    path: `${PATH}/${options.newsListId}${queryParams}`,
  }, callback);

}

function hasRequiredProperty(options) {
  return !!options.newsListId;
}

function getQueryParams(options) {
  let qs = '';

  if (options.memberId) {
    qs = `?member_id=${options.memberId}`;
  }

  return qs;
}
