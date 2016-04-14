import Helper from '../helper/helper';

const METHOD = 'GET';
const PATH_1 = '/api/members/';
const PATH_2 = '/tags';
const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';
const ERROR_MESSAGE = 'You must provide a member ID.';

export default function () {

  let args = Array.prototype.slice.call(arguments); // arguments to array
  let { tagClusterCode = null, tagCode = null } = getCodes(args);
  let callback = Helper.getCallback(args);

  if (!callback) {
    return this.handleError(ERROR_MESSAGE_CALLBACK, callback);
  }

  let memberId = Helper.getMemberId.call(this, args);

  if (!memberId) {
    return this.handleError(ERROR_MESSAGE, callback);
  }

  let additionalPath = getAdditionalPath(tagClusterCode, tagCode);

  return this.baseRequest({
    method: METHOD,
    path: `${PATH_1}${memberId}${PATH_2}${additionalPath}`,
  }, callback);

}

function getCodes(options) {
  if (options && options.length && options.length > 1) {
    return options[0];
  }

  return {};
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
