const METHOD = 'GET';
const PATH = '/api/contests';

export default function (options, callback) {

  options = options || {};
  let queryParams = getQueryParams(options);

  return this.baseRequest({
    method: METHOD,
    path: `${PATH}${queryParams}`,
  }, callback);

}

function getQueryParams(options) {
  let qs = '';

  if (options.memberId) {
    qs = `?member_id=${options.memberId}`;
  }

  return qs;
}
