const METHOD = 'PUT';
const ERROR_MESSAGE_ENDPOINT = 'You must provide a endpoint.';
const ERROR_MESSAGE_BODY = 'You must provide a request body.';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

export default function (endpoint, body, callback) {

  if (!endpoint || typeof endpoint !== 'string') {
    return lr360.client.handleError(ERROR_MESSAGE_ENDPOINT, callback);
  }

  if (!body || typeof body !== 'object') {
    return lr360.client.handleError(ERROR_MESSAGE_BODY, callback);
  }

  if (!callback || typeof callback !== 'function') {
    return lr360.client.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  return lr360.client.baseRequest({
    method: METHOD,
    path: endpoint,
    body: body,
  }, callback);

}
