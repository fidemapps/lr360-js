let assign = require('lodash.assign');

export default function (config) {

    config = config || {};

    this.config = assign({}, this.config, config);

}
