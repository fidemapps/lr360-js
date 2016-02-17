import Helper from '../helper/helper';
let assign = require('lodash.assign');

let ERROR_MESSAGE = 'You must provide a Key.';

export default function (config) {

  config = config || {};

  if (!Helper.hasRequiredProperties('key', config)) {
    return this.handleError(ERROR_MESSAGE);
  }

  this.config = assign({}, this.config, config);

}
