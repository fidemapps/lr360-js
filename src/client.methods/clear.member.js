import Helper from '../helper/helper';

const METHOD = 'DELETE';
const PATH = '/api/gamification/actions/identify-member';

export default function () {

  let args = Array.prototype.slice.call(arguments); // arguments to array
  let callback = Helper.getCallback(args) || function () {};

  let interceptor = (error, response) => {
    this.memberId = null;
    return callback(error, response);
  };

  return this.baseRequest({
    method: METHOD,
    path: `${PATH}`,
  }, interceptor);

}
