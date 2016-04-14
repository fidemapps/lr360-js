import Helper from '../helper/helper';

const METHOD = 'GET';
const PATH_1 = '/api/devices/';
const PATH_2 = '/tags';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';
const ERROR_MESSAGE = 'You must provide a device ID.';

// export default function ({ deviceId = null, tagClusterCode = null, tagCode = null }, callback = null) {
export default function (options, callback) {

  if (!callback || typeof callback !== 'function') {
    return this.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  options = options || {};

  if (!Helper.hasRequiredProperties('deviceId', options)) {
    return this.handleError(ERROR_MESSAGE, callback);
  }

  let additionalPath = getAdditionalPath(options.tagClusterCode, options.tagCode);

  return this.baseRequest({
    method: METHOD,
    path: `${PATH_1}${options.deviceId}${PATH_2}${additionalPath}`,
  }, callback);

}

function getAdditionalPath(tagClusterCode, tagCode) {
  let path = '';

  if (tagClusterCode) {
    path += `/${tagClusterCode}`;

    if (tagCode) {
      path += `/${tagCode}`;
    }
  }

  return path;
}
