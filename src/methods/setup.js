let assign = require('lodash.assign');
let ERROR_MESSAGE = 'You must provide a Key.';

export default function (config) {

  config = config || {};

  if (!hasRequiredProperty(config)) {
    return this.handleError(ERROR_MESSAGE);
  }

  this.config = assign({}, this.config, config);

}

function hasRequiredProperty(config) {
  return !!config.key;
}
