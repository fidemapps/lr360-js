import Helper from '../helper/helper';
const METHOD = 'GET';
const PATH = '/api/devices';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback';

export default function () {

  let args = Array.prototype.slice.call(arguments); // arguments to array
  let callback = Helper.getCallback(args);

  if (!callback) {
    return this.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  let deviceId = Helper.getDeviceId(args);

  return this.baseRequest({
    method: METHOD,
    path: `${PATH}/${deviceId}`,
  }, callback);

}
