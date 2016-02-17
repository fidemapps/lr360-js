import Helper from '../helper/helper';

const METHOD = 'GET';
const PATH_ID = '/api/devices';
const PATH_ME = '/api/device';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

export default function () {

  let args = Array.prototype.slice.call(arguments); // arguments to array
  let callback = Helper.getCallback(args);

  if (!callback) {
    return this.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  let deviceId = Helper.getDeviceId(args);

  return this.baseRequest({
    method: METHOD,
    path: deviceId === 'me' ? `${PATH_ME}/${deviceId}` : `${PATH_ID}/${deviceId}`,
  }, callback);

}
