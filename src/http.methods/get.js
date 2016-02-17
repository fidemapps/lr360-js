const METHOD = 'GET';
const ERROR_MESSAGE_ENDPOINT = 'You must provide a endpoint.';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

export default function (endpoint, callback) {

  if (!endpoint || typeof endpoint !== 'string') {
    return lr360.client.handleError(ERROR_MESSAGE_ENDPOINT, callback);
  }

  if (!callback || typeof callback !== 'function') {
    return lr360.client.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  return lr360.client.baseRequest({
    method: METHOD,
    path: endpoint,
  }, callback);

}
